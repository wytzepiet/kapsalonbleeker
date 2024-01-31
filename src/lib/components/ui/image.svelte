<script>
	export let className = '';
	export let src = '';
	export let alt = '';
</script>

<img class={className} src={`/_vercel/image?url=${src}&q=75`} {alt} />
