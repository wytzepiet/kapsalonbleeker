<script lang="ts">
	import type { PageData, ActionData } from './$types';

	import AfspraakFormulier from './afspraakFormulier.svelte';
	import { openingHours } from '$lib/openingHours';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import WhatsappIcon from '../lib/components/ui/whatsappIcon.svelte';

	export let data: PageData;
	export let form: ActionData;

	let dayOfWeek = new Date().getDay();

	$: if (form?.form.valid) {
		let { name, date, time } = form.form.data;
		date = new Date(date).toLocaleDateString('nl-NL', {
			weekday: 'long',
			day: 'numeric',
			month: 'long'
		});
		const message = `Hallo Gerrit,\nIk wil graag een afspraak maken op ${date} om ${time}.\nGroeten, ${name}`;
		window.location.href = 'https://wa.me/+31653392572?text=' + encodeURIComponent(message);
	}
</script>

<div style="height: 50px"></div>

<div class="logo">
	<h2>Kapsalon</h2>
	<h1 class="serif">Bleeker</h1>
	<h2>Bolsward</h2>
</div>

<div style="height: 50px"></div>

<div class="page gap">
	<div class="gap flex">
		<img class="rounded" src="/images/portret-tiny.webp" alt="" />
		<div class="card min-w-80">
			<h3>Openingstijden</h3>
			{#each openingHours as day, i}
				<p class="opening-day" class:current-day={i === dayOfWeek}>
					<span class="day">{day.day}</span>
					<span class="hours">
						{day.opened ? day.openingTime + ' - ' + day.closingTime : 'Gesloten'}
					</span>
				</p>
			{/each}
		</div>
	</div>
	<div class="gap reserveren flex">
		<div class="card flex-1">
			<p class="text-muted-foreground">Afspraak maken</p>
			<h2>Dames</h2>

			<p><span class="text-muted-foreground"> Bel ons: </span>&nbsp 0515 572 557</p>
		</div>
		<div class="card flex-1">
			<p class="text-muted-foreground">Afspraak maken</p>
			<h2>Heren</h2>
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
					<WhatsappIcon />&nbsp;&nbsp;Maak afspraak via Whatsapp
				</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>
						<Dialog.Title>Afspraak aanvragen via WhatsApp</Dialog.Title>
						<!-- <Dialog.Description></Dialog.Description> -->
					</Dialog.Header>
					<AfspraakFormulier form={data.form} />
				</Dialog.Content>
			</Dialog.Root>

			<br /> <br />
			<p><span class="text-muted-foreground">Of bel </span>&nbsp 0515 572 557</p>
		</div>
	</div>
</div>

<div class="my-10 flex items-end justify-between text-sm text-muted-foreground">
	<div>
		<div class="socials flex gap-5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="30"
				height="30"
				viewBox="0 0 50 50"
			>
				<path
					d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"
				></path>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				width="30"
				height="30"
				viewBox="0 0 24 24"
			>
				<path
					d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"
				></path>
			</svg>
		</div>
		<p>Kapsalon Bleeker</p>
		<p>Jongemastraat 39, Bolsward</p>
	</div>

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
		color: hsl(var(--background));
	}

	.page {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	.gap {
		gap: 25px;
	}
	.rounded,
	.card {
		border-radius: 20px;
	}
	.card {
		background-color: hsl(var(--background));
		border: 1px solid hsl(var(--muted-border));
		padding: min(40px, var(--side-margin));
	}
	img {
		width: 0px;
		flex-grow: 1;
		aspect-ratio: 1 /1;
		object-fit: cover;
	}
	@media only screen and (max-width: 700px) {
		.page > .flex {
			flex-direction: column;
		}
		img {
			width: 100%;
		}
	}

	.opening-day {
		padding: 13px 0px;
		margin: 0px;
		display: flex;
		gap: 20px;
		justify-content: space-between;
		white-space: nowrap;
	}
	.opening-day:not(:last-child) {
		border-bottom: 1px solid hsl(var(--border));
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
	.socials {
		padding-bottom: 20px;
	}
	.socials svg {
		fill: hsl(var(--muted-foreground));
	}
</style>
