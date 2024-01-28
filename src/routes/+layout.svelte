<script>
	import '../app.pcss';
	import '$lib/style.css';
</script>

<div class="site"><slot /></div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700&family=Poppins:wght@200;300;400;500;600;700;800&display=swap');

	.site {
		display: grid;
		grid-template-columns:
			[full-start] minmax(20px, auto) [main-start] min(90%, 900px) [main-end]
			minmax(20px, auto) [full-end];
	}
	.site > :global(*) {
		grid-column: main;
	}
</style>
