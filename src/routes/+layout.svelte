<script>
	import '../app.pcss';
	import '$lib/style.css';
</script>

<div class="site"><slot /></div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700&family=Poppins:wght@200;300;400;500;600;700;800&display=swap');

	.site {
		--side-margin: max(20px, 4vw);
		display: grid;
		width: 100%;
		grid-template-columns:
			[full-start] minmax(var(--side-margin), auto) [main-start] minmax(auto, 900px) [main-end]
			minmax(var(--side-margin), auto) [full-end];
	}
	.site > :global(*) {
		grid-column: main;
	}
</style>
