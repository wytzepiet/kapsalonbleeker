<script>
	import '../app.pcss';
	import '$lib/style.css';
</script>

<div class="site"><slot /></div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700&family=Poppins:wght@200;300;400;500;600;700;800&display=swap');

	.site {
		--side-margin: max(10px, 3vw);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0px var(--side-margin);

		background: linear-gradient(108deg, hsl(34.68deg 17.83% 54.7%), hsl(35, 36%, 32%));
		background-attachment: fixed;
		color: hsl(var(--foreground));
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
	}

	.site > :global(*) {
		max-width: 1100px;
	}
</style>
