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
	import WhatsappIcon from './whatsappIcon.svelte';

	export let form: SuperValidated<FormSchema> = $page.data.datePicker;

	const theForm = superForm(form, {
		validators: formSchema,
		taintedMessage: null
	});

	const { form: formStore } = theForm;

	const df = new DateFormatter('nl-NL', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined = $formStore.date ? parseDate($formStore.date) : undefined;

	let placeholder: DateValue = today(getLocalTimeZone());
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
			<Popover.Root>
				<Form.Control id="date" let:attrs>
					<Popover.Trigger
						id="date"
						{...attrs}
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[280px] pl-4 justify-start text-left font-normal',
							!value && 'text-muted-foreground'
						)}
					>
						{value ? df.format(value.toDate(getLocalTimeZone())) : 'Kies datum'}
						<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
					</Popover.Trigger>
				</Form.Control>
				<Popover.Content class="w-auto p-0" side="top">
					<Calendar
						bind:value
						bind:placeholder
						minValue={today(getLocalTimeZone())}
						maxValue={today(getLocalTimeZone()).add({ days: 365 })}
						calendarLabel="Datum"
						initialFocus
						onValueChange={(v) => {
							if (v) {
								$formStore.date = v.toDate(getLocalTimeZone()).toISOString();
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
							{#each { length: 50 } as _, i}
								<Form.SelectItem
									value={`${Math.floor(i / 6) + 8}:${((i % 6) * 10).toLocaleString('nl-NL', {
										minimumIntegerDigits: 2,
										useGrouping: false
									})}`}
								>
									{`${Math.floor(i / 6) + 8}:${((i % 6) * 10).toLocaleString('nl-NL', {
										minimumIntegerDigits: 2,
										useGrouping: false
									})}`}
								</Form.SelectItem>
							{/each}
						</div>
					</Form.SelectContent>
				</Form.Select>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	</div>

	<Button type="submit"><WhatsappIcon />&nbsp;&nbsp;Vraag aan via Whatsapp</Button>
	<p class="text-muted-foreground text-sm">
		U krijgt via Whatsapp bevestiging of de<br /> datum en tijd beschikbaar zijn.
	</p>
</Form.Root>

<style>
	.time :global(button) {
		display: flex;
		gap: 10px;
		min-width: 105px;
	}
</style>
