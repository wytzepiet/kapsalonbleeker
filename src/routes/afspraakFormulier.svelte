<script lang="ts">
	import { page } from '$app/stores';
	import { Calendar as CalendarIcon } from 'lucide-svelte';
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		parseDate,
		CalendarDate,
		today
	} from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { formSchema, type FormSchema } from './schema';
	import WhatsappIcon from '$lib/components/ui/whatsappIcon.svelte';
	import { openingHours } from '$lib/stores';

	export let form: SuperValidated<FormSchema> = $page.data.datePicker;

	const theForm = superForm(form, {
		validators: formSchema,
		taintedMessage: null
	});

	const { form: formStore } = theForm;

	const df = new DateFormatter('nl-NL', {
		dateStyle: 'long'
	});

	let dateValue: DateValue | undefined = $formStore.date ? parseDate($formStore.date) : undefined;
	let datePlaceholder: DateValue = today(getLocalTimeZone());
	let datePickerOpen = false;
	function setDatePickerOpen(open: boolean) {
		datePickerOpen = open;
	}

	let availableTimes: string[][] = [];
	$openingHours.forEach((day) => {
		if (!day.open) return availableTimes.push(['']);

		const times: string[] = [];
		const openingTime = day.openingTime.split(':');
		const closingTime = day.closingTime.split(':');
		const openingDate = new Date();
		openingDate.setHours(Number(openingTime[0]), Number(openingTime[1]), 0, 0);
		const closingDate = new Date();
		closingDate.setHours(Number(closingTime[0]), Number(closingTime[1]), 0, 0);

		while (openingDate < closingDate) {
			times.push(
				openingDate
					.toLocaleTimeString('nl-NL', {
						hour: '2-digit',
						minute: '2-digit'
					})
					.replace(':', ':')
			);
			openingDate.setMinutes(openingDate.getMinutes() + 15);
		}
		availableTimes.push(times);
	});

	$: availableTimesToday = dateValue
		? availableTimes[dateValue.toDate(getLocalTimeZone()).getDay()]
		: [''];
</script>

<Form.Root
	schema={formSchema}
	controlled
	form={theForm}
	let:config
	action="?/datePicker"
	class="space-y-5"
>
	<Form.Field {config} name="name">
		<Form.Item>
			<Form.Label>Naam</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="date">
		<Form.Item class="flex flex-col">
			<Form.Label for="date">Datum</Form.Label>
			<Popover.Root open={datePickerOpen} onOpenChange={setDatePickerOpen}>
				<Form.Control id="date" let:attrs>
					<Popover.Trigger
						id="date"
						{...attrs}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[280px] pl-4 justify-start text-left font-normal',
							!dateValue && 'text-muted-foreground'
						)}
					>
						{dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : 'Kies datum'}
						<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
					</Popover.Trigger>
				</Form.Control>
				<Popover.Content class="w-auto p-0" side="top">
					<Calendar
						bind:value={dateValue}
						bind:placeholder={datePlaceholder}
						minValue={today(getLocalTimeZone())}
						maxValue={today(getLocalTimeZone()).add({ days: 365 })}
						calendarLabel="Datum"
						initialFocus
						onValueChange={(v) => {
							if (v) {
								const newDate = v.toDate(getLocalTimeZone()).toISOString();
								if (newDate !== $formStore.date) setDatePickerOpen(false);
								$formStore.date = newDate;
							} else {
								$formStore.date = '';
							}
						}}
					/>
				</Popover.Content>
			</Popover.Root>
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<div class="time">
		<Form.Field {config} name="time">
			<Form.Item>
				<Form.Label>Tijd</Form.Label>
				<Form.Select>
					<Form.SelectTrigger placeholder="Kies tijd" />
					<Form.SelectContent>
						<div class="overflow-y-scroll max-h-80">
							{#each availableTimesToday as time}
								<Form.SelectItem value={time}>
									{time}
								</Form.SelectItem>
							{/each}
						</div>
					</Form.SelectContent>
				</Form.Select>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	</div>
	<p class="text-muted-foreground text-sm">
		U krijgt via Whatsapp bevestiging of de gekozen datum en tijd beschikbaar zijn.
	</p>
	<Button type="submit"><WhatsappIcon />&nbsp;&nbsp;Verstuur aanvraag</Button>
</Form.Root>

<style>
	.time :global(button) {
		display: flex;
		gap: 10px;
		min-width: 105px;
	}
</style>
