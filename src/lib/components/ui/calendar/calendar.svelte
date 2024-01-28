<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import * as Calendar from '.';
	import { cn } from '$lib/utils';
	import { openingHours } from '$lib/stores';
	import { getLocalTimeZone, toLocalTimeZone } from '@internationalized/date';

	type $$Props = CalendarPrimitive.Props;

	type $$Events = CalendarPrimitive.Events;

	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = undefined;
	export let weekdayFormat: $$Props['weekdayFormat'] = 'short';

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<CalendarPrimitive.Root
	bind:value
	bind:placeholder
	{weekdayFormat}
	class={cn('p-3', className)}
	{...$$restProps}
	on:keydown
	let:months
	let:weekdays
>
	<Calendar.Header>
		<Calendar.PrevButton />
		<Calendar.Heading />
		<Calendar.NextButton />
	</Calendar.Header>
	<Calendar.Months>
		{#each months as month}
			<Calendar.Grid>
				<Calendar.GridHead>
					<Calendar.GridRow class="flex">
						{#each weekdays as weekday}
							<Calendar.HeadCell>
								{weekday.slice(0, 2)}
							</Calendar.HeadCell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridHead>
				<Calendar.GridBody>
					{#each month.weeks as weekDates}
						<Calendar.GridRow class="w-full mt-2">
							{#each weekDates as date}
								<div
									class="day"
									class:disabled={!$openingHours[date.toDate(getLocalTimeZone()).getDay()].open}
								>
									<Calendar.Cell {date}>
										<Calendar.Day {date} month={month.value} />
									</Calendar.Cell>
								</div>
							{/each}
						</Calendar.GridRow>
					{/each}
				</Calendar.GridBody>
			</Calendar.Grid>
		{/each}
	</Calendar.Months>
</CalendarPrimitive.Root>

<style>
	.day.disabled {
		color: hsl(var(--muted-foreground));
		opacity: 0.5;
		pointer-events: none;
	}
</style>
