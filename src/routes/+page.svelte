<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import AfspraakFormulier from './afspraakFormulier.svelte';
	import { openingHours } from '$lib/stores';

	let dayOfWeek = new Date().getDay();
	openingHours.set([
		{ day: 'Maandag', open: false, openingTime: '08:00', closingTime: '18:00' },
		{ day: 'Dinsdag', open: true, openingTime: '08:00', closingTime: '18:00' },
		{ day: 'Woensdag', open: true, openingTime: '08:00', closingTime: '18:00' },
		{ day: 'Donderdag', open: true, openingTime: '08:00', closingTime: '18:00' },
		{ day: 'Vrijdag', open: true, openingTime: '08:00', closingTime: '18:00' },
		{ day: 'Zaterdag', open: true, openingTime: '08:00', closingTime: '13:00' },
		{ day: 'Zondag', open: false, openingTime: '08:00', closingTime: '18:00' }
	]);
</script>

<div style="height: 50px"></div>

<div class="logo">
	<h2>Kapsalon</h2>
	<h1 class="serif">Bleeker</h1>
	<h2>Bolsward</h2>
</div>

<div style="height: 50px"></div>

<div class="page">
	<div class="flex">
		<img class="rounded" src="/images/portret.webp" alt="" />
		<div class="card min-w-80">
			<h3>Openingstijden</h3>
			{#each $openingHours as day, i}
				<p class="opening-day" class:current-day={i === dayOfWeek}>
					<span class="day">{day.day}</span>
					<span class="hours">
						{day.open ? day.openingTime + ' - ' + day.closingTime : 'Gesloten'}
					</span>
				</p>
			{/each}
		</div>
	</div>
	<div class="flex reserveren">
		<div class="card">
			<p class="text-muted-foreground">Afspraak maken</p>
			<h2>Dames</h2>
		</div>
		<div class="card">
			<p class="text-muted-foreground">Afspraak maken</p>
			<h2>Heren</h2>

			<AfspraakFormulier form={data.form} />
		</div>
	</div>
</div>

<div class="text-muted-foreground text-sm my-10 flex justify-between">
	<p>Copyright 2024 Kapsalon Bleeker</p>
	<p>Website door WW Studio</p>
</div>

<style>
	.logo {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.logo > * {
		margin: 0px;
		text-transform: uppercase;
		display: block;
	}
	.logo h2 {
		padding-left: 0.5em;
		letter-spacing: 0.6em;
		font-weight: 200;
	}
	.logo h1 {
		letter-spacing: 0.3em;
		padding: 0px 10px;
		background-color: hsl(var(--foreground));
		color: black;
	}

	.page {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 20px;
	}
	.page .flex {
		display: flex;
		gap: 20px;
	}

	.rounded,
	.card {
		border-radius: 20px;
	}
	.card {
		background-color: hsl(var(--background));
		border: 1px solid hsl(var(--dark-border));
		padding: min(40px, var(--side-margin));
	}
	img {
		width: 0px;
		flex-grow: 1;
		aspect-ratio: 1 /1;
		object-fit: cover;
	}
	@media only screen and (max-width: 700px) {
		.page .flex {
			flex-direction: column;
		}
		img {
			width: 100%;
		}
	}

	.opening-day {
		border-bottom: 1px solid hsl(var(--border));
		padding: 13px 0px;
		margin: 0px;
		display: flex;
		gap: 20px;
		justify-content: space-between;
		white-space: nowrap;
	}
	.current-day {
		background-color: hsl(var(--muted));
		border-radius: var(--radius);
		margin: -1px -10px;
		padding: 8px 15px;
	}

	.day {
		color: hsl(var(--muted-foreground));
	}
	.current-day .day {
		color: hsl(var(--foreground));
	}

	.hours {
		font-weight: 500;
	}

	.reserveren .card {
		flex: 1;
	}
</style>
