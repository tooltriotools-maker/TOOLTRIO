import type { InsultTool } from './data'

export type FAQ = { question: string; answer: string }

const genericLead = (t: InsultTool) => `The ${t.title.toLowerCase()} is a free creative writing and entertainment tool built around ${t.style}. Instead of asking you to invent a line from scratch, it combines descriptive phrases, character-style nouns, and punchy endings into a fresh sentence in seconds. The goal is not to create genuinely abusive language. It is to make exaggerated, obviously playful banter that fits the theme of the page. That makes this generator useful when you need a quick joke for a party, a writing prompt for a scene, a role-playing line, or a silly message for someone who already understands the joke.`

const howItWorks = (t: InsultTool) => `Every result is assembled in your browser from themed building blocks selected for ${t.style}. The first layer supplies a memorable description such as “${t.adjectives[0]}”; the second gives the joke a character, such as a “${t.nouns[0]}”; and the final layer adds an absurd consequence or observation, such as “${t.endings[0]}.” Changing the tone changes the sentence pattern rather than simply swapping one word. Because the selections are independent, the same page can produce many combinations without requiring an account or sending your input to a server. This is especially useful for quick, repeatable entertainment.`

const bestFor = (t: InsultTool) => `This generator works particularly well for ${t.useCases.join(', ')}. It can also be used as a low-pressure creativity exercise: pick a result, rewrite it in your own voice, and turn the joke into dialogue for a character. Writers can use the output as a starting point rather than treating it as finished prose. Game masters can use a line to give an NPC a distinctive personality. Party hosts can print or read results aloud as prompts. The themed vocabulary also helps a group stay inside the fictional setting instead of falling back on generic modern insults.`

const tone = (t: InsultTool) => `Tone matters with any roast-style humor. The ${t.title.toLowerCase()} is deliberately designed around exaggeration, fictional roles, objects, habits, and absurd situations rather than protected traits or personal vulnerabilities. That distinction keeps the joke closer to cartoon comedy than personal harassment. A line about a “${t.nouns[1]}” or a person whose “${t.endings[1]}” is intentionally ridiculous; it gives everyone room to laugh without turning the generator into a tool for attacking someone's identity. If you are using a result with another person, choose a context where playful teasing is welcome and stop if the other person is not enjoying it.`

const customization = (t: InsultTool) => `You can make the results feel more personal without making them cruel. Start with the generated line, then replace the fictional noun with a harmless shared reference: a friend's legendary lateness, a teammate's obsession with snacks, a character's terrible map-reading, or a running joke from your group. For ${t.style}, the best edits usually preserve the rhythm and exaggeration. Short lines are good for chat; theatrical versions work better when spoken aloud; longer versions can become dialogue in a story. Treat the generator as a prompt machine: the funniest final version often comes from the human edit that follows the first result.`

const ideas = (t: InsultTool) => `For a group activity, try a three-round challenge. In round one, everyone generates a line and reads it with a straight face. In round two, each player must improve their line by adding a harmless detail from the fictional setting. In round three, players turn the result into a character voice. For example, ${t.title.toLowerCase()} can become a prompt for a tavern keeper, rival, captain, royal adviser, office character, comic villain, or other role that matches the theme. This turns a one-click generator into a small writing game and encourages originality instead of repeating the same stock phrase.`

const privacy = () => `The interactive generator is designed to work locally in the browser. You do not need to create an account, enter an email address, or provide a name to generate a result. The page's generator logic selects from its built-in vocabulary and displays the sentence on your device. If you use the browser's native Share feature, your device or operating system controls the share destination. As with any website, normal analytics or hosting infrastructure can still process standard technical requests, but the generator itself does not need personal information to create an insult. For the safest experience, avoid putting private or sensitive information into anything you later publish or share.`

const quality = (t: InsultTool) => `A good themed insult is more than a random collection of negative words. It has a recognizable voice, a clear image, and a comic turn. That is why this ${t.title.toLowerCase()} separates its vocabulary into descriptive phrases, character nouns, and endings. The combination creates a tiny setup and punchline: first the listener imagines the character, then the final phrase changes the scale of the joke. The best results are memorable because they are specific enough to picture but absurd enough not to be taken literally. If one result is not perfect, generate another; variety is part of the experience.`

const conclusion = (t: InsultTool) => `Use the ${t.title.toLowerCase()} as a source of playful lines, writing prompts, and themed comedy rather than a substitute for judgment. The strongest joke is one that fits the room, respects the people hearing it, and leaves everyone able to laugh. Whether you are preparing a ${t.style} scene, looking for a quick message, or simply testing how ridiculous a sentence can become, the generator gives you a fast starting point. Generate a few options, pick the one with the best rhythm, customize it, and make the final line your own.`

const quickTips = (t: InsultTool) => `For the best experience, generate three to five options before choosing one. Read each line aloud because rhythm is a major part of ${t.style}. Prefer a sentence that paints a funny picture over one that simply sounds negative. If you are writing dialogue, give the line to a character whose personality explains why they would say it. If you are using the result in a group, keep the joke about the fictional situation rather than a person's identity, appearance, health, family, or other sensitive subject. A little editing can make a generic result feel like an original joke: change the setting, add a harmless shared reference, or give the character a ridiculous title. The generator supplies the spark; your context supplies the punchline.`

export function getArticleSections(t: InsultTool) {
  return [
    { heading: `What is a ${t.title}?`, paragraphs: [genericLead(t)] },
    { heading: `How the ${t.title} works`, paragraphs: [howItWorks(t)] },
    { heading: `What makes the results fit the theme`, paragraphs: [quality(t)] },
    { heading: `Who can use this generator?`, paragraphs: [bestFor(t)] },
    { heading: `Keeping the humor playful`, paragraphs: [tone(t)] },
    { heading: `How to customize a generated line`, paragraphs: [customization(t)] },
    { heading: `Fun ways to use the generator`, paragraphs: [ideas(t)] },
    { heading: `Privacy and ease of use`, paragraphs: [privacy()] },
    { heading: `Quick tips for stronger results`, paragraphs: [quickTips(t)] },
    { heading: `Final tips for better roasts`, paragraphs: [conclusion(t)] },
  ]
}

export function getFAQs(t: InsultTool): FAQ[] {
  return [
    {
      question: `Is the ${t.title.toLowerCase()} free?`,
      answer: `Yes. The generator is free to use and does not require an account. You can generate, copy, and share playful results directly from the page.`,
    },
    {
      question: `What style does this ${t.title.toLowerCase()} create?`,
      answer: `It focuses on ${t.style}. Its vocabulary and sentence patterns are designed to feel recognizable, exaggerated, and humorous rather than like generic insults.`,
    },
    {
      question: `Can I use the generated lines with friends?`,
      answer: `Yes, when the people involved enjoy playful teasing. The safest approach is to use the generator for fictional, exaggerated, or harmless jokes and respect anyone who does not want to participate.`,
    },
    {
      question: `Can I use these insults in a story or game?`,
      answer: `Absolutely. Generated lines can work as dialogue prompts for characters, tabletop role-playing scenes, party games, improvisation, and creative writing.`,
    },
    {
      question: `Does the generator need my name or personal information?`,
      answer: `No. The generator does not need a name, email address, or account to produce a result. It works from its built-in themed vocabulary.`,
    },
    {
      question: `Can I copy or share a result?`,
      answer: `Yes. Use the Copy button to place the result on your clipboard or use the Share button when your device supports native sharing.`,
    },
    {
      question: `Are the results meant to be serious insults?`,
      answer: `No. They are intended as playful entertainment and creative prompts. Avoid using them to harass, threaten, or target someone for a personal or protected characteristic.`,
    },
    {
      question: `How can I get a better result?`,
      answer: `Generate several options and choose the one with the funniest rhythm. You can also adapt a harmless detail from your own fictional scene, group joke, or character while keeping the tone friendly.`,
    },
  ]
}
