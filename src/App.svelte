<script defer>
	import { onMount, afterUpdate } from "svelte";

	import "emoji-picker-element"
	import insertText from "insert-text-at-cursor"

	import { formatForDiscord } from "./formatting.js"

	let inputs = {}

	let previousFocus = null

	onMount(async () => {
		document.querySelector("emoji-picker").addEventListener("emoji-click", e => {
			insertText(previousFocus, e.detail.unicode)
			previousFocus.focus()
		})

		document.querySelectorAll("input[type=text],textarea").forEach((elem) => {
			elem.addEventListener("blur", () => {
				previousFocus = elem
			})
		})
	})

	const copyToClipboard = () => {
		navigator.clipboard.writeText(formatForDiscord(inputs))
		alert("Copied!")
	}
</script>

<main class="container pt-5 pb-5">
	<h1>Publicity Generator</h1>
	<div class="pt-2"></div>

	<div class="row">
		<div class="col me-col-auto">

			<div class="input-group mb-3">
				<span class="input-group-text">Event title</span>
				<input type="text" class="form-control" placeholder="CSS Buys You More Pizza" bind:value={inputs.title}>
			</div>

			<div class="input-group mb-3">
				<span class="input-group-text">Emoji one</span>
				<input type="text" class="form-control" placeholder="🍕" bind:value={inputs.emojiOne}>
				<span class="input-group-text">Emoji two</span>
				<input type="text" class="form-control" placeholder="🤪" bind:value={inputs.emojiTwo}>
			</div>

			<div class="input-group mb-3">
				<span class="input-group-text">Date</span>
				<input type="date" class="form-control" bind:value={inputs.date}>
				<span class="input-group-text">Time (24hr)</span>
				<input type="time" class="form-control" bind:value={inputs.time}>
			</div>

			<div class="input-group mb-3">
				<span class="input-group-text">Location</span>
				<select class="form-control" bind:value={inputs.location}>
					<option disabled selected value="nodef">(select one)</option>
					<option value="irl">In-person</option>
					<option value="online">Online</option>
				</select>
				<input type="text" class="form-control" placeholder="Location detail" bind:value={inputs.locationDetail}>
			</div>

			<input class="form-check-input" type="checkbox" id="pingNewsCheckbox" bind:checked={inputs.pingNews}>
			<label class="form-check-label" for="pingNewsCheckbox">Ping news?</label>

			<div class="form-floating mt-2 mb-2">
				<textarea class="form-control" bind:value={inputs.description} placeholder="Description" id="descriptionTextarea" style="height: 100px;"></textarea>
				<label for="descriptionTextarea">Event description</label>
			</div>

			<div class="input-group mb-3">
				<span class="input-group-text">Discord event link</span>
				<input type="text" class="form-control" placeholder="https://discord.gg/events/..." bind:value={inputs.discordEventLink}>
			</div>

			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Optional additions</h5>

					<div class="input-group mt-2 mb-3">
						<span class="input-group-text">Tickets?</span>
						<input type="text" class="form-control" placeholder="Ticket link" bind:value={inputs.tickets}>
					</div>
					
					<div class="input-group mb-3">
						<span class="input-group-text">Cost?</span>
						<input type="text" class="form-control" placeholder="Cost" bind:value={inputs.cost}>
					</div>

					<div class="input-group mb-3">
						<span class="input-group-text">Other links?</span>
						<input type="text" class="form-control" placeholder="Other links" bind:value={inputs.otherLinks}>
					</div>

					<div class="input-group mb-3">
						<span class="input-group-text">Election?</span>
						<input type="text" class="form-control" placeholder="Roles being elected" bind:value={inputs.electionRoles}>
					</div>
				</div>
			</div>

			<h2 class="pt-4">Output</h2>

			<div class="card">
				<div class="card-body">
					<textarea class="form-control mb-2" rows="10" readonly>{formatForDiscord(inputs)}</textarea>
					<button class="btn btn-primary" on:click={copyToClipboard}>Copy to clipboard</button>
				</div>
			</div>

		</div>
		<div class="col col-auto">
			<emoji-picker></emoji-picker>
		</div>
	</div>

</main>

<style></style>