export const formatForDiscord = (inputs) => {
    let lines = []

    // emoji1, event title, emoji2, news ping, tex, megaphone
    {
        let x = `${inputs.emojiOne ?? ""} **${inputs.title ?? ""}** ${inputs.emojiTwo ?? ""} `
        if (inputs.pingNews) {
            x += "@News "
        }
        x += ":TeX::mega:"
        lines.push(x)
    }

    // date emoji, clock emoji, timestamp, timestamp
    {
        const date = new Date(inputs.date ?? "2023-06-01")
        const timeparts = (inputs.time ?? "00:00").split(":")
        date.setHours(timeparts[0], timeparts[1])
        const ts = date.getTime() / 1000
        lines.push(`:date: :clock${(date.getHours() > 12 ? date.getHours() - 12 : date.getHours())}: <t:${ts}:F> <t:${ts}:R>`)
    }

    // location
    {
        let x = ""

        if (inputs.location === "irl" || inputs.location === "nodef") {
            x += ":earth_africa: **In-person**"
        } else if (inputs.location === "online") {
            x += ":globe_with_meridians: **Online**" 
        }

        if (inputs.locationDetail) {
            x += `: ${inputs.locationDetail}`
        }

        lines.push(x)
    }

    lines.push("")
    
    if (inputs.tickets) {
        lines.push(`:tickets: ${inputs.tickets}`)
    }

    if (inputs.otherLinks) {
        lines.push(`:link: ${inputs.otherLinks}`)
    }

    if (inputs.cost) {
        lines.push(`:pound: ${inputs.cost}`)
    }

    if (inputs.electionRoles) {
        lines.push(`:ballot_box: Electing ${inputs.electionRoles}`)
    }

    if (inputs.tickets || inputs.otherLinks || inputs.cost || inputs.electionRoles) {
        lines.push("")
    }
    
    lines.push(inputs.description ?? "")
    if (inputs.discordEventLink) {
        lines.push("")
        lines.push(`${inputs.discordEventLink}`)
    }

    return lines.join("\n")
}