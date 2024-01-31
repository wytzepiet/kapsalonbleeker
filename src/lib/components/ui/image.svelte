<script>
	export let className = '';
	export let src = '';
	export let alt = '';
</script>

<img class={className} src={`/_vercel/image?url=${src}&w=1000&q=75`} {alt} />
