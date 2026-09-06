// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
/**
 * Town square district — arc-two relationship progression beats.
 */
import { buildArcTwo, mergeArcTwo, arcLine, arcExamine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(
  buildArcTwo('lottie_crier', {
    examine: [
      arcExamine(
        `Lottie rings her bell softer when she spots you, mom-bod frame still lean beneath the sash but cheeks flushing with a gossip she saves instead of cries. Ginger biscuits hide under a napkin on the step — one fewer than there were a moment ago, and she does not pretend otherwise.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The town crier has softened where bulletins and biscuits accumulated, belly pressing the cord of her sash, voice still thunderous for the square but dropping to a conspiratorial purr for you alone. She mentions Sophie's ledgers and Fable's new verse in the same breath as your name — headline material, she says, if you let her.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Lottie occupies the plaza like the fountain's louder sister, enormously full-figured, bell resting on a belly that shifts when she leans into particularly juicy whispers meant only for you. The step groans; the town listens anyway. "Hear ye," she murmurs, "my favorite citizen returns — and I saved the corner biscuit."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `THERE you are! I was about to cry something nice — don't tell anyone. Saved gossip and a biscuit. Both yours.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Hear ye, hear ye — it's you! Sophie says you're respectable. Roxy says you're dangerous. I say you're dessert-adjacent. Correct?`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Oh — front-page worthy. Sweet, substantial, exactly what a woman with my schedule deserves. I may sit before the next bulletin. For you.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm! Ginger and goodwill — you taste like both. I'll cry your virtues at noon. Loudly. Unless you blush. Then quietly.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          `You've never given me dull rumor or bad meal. Rare things. I trust rare things — and you. Don't make me cry something sincere; it ruins my brand.`,
          { ...ARC.bonded },
        ),
      ],
      tavern_chat: [
        arcLine(
          `Bella keeps the Boar loud; I keep the square louder. Fable steals my audience — I steal her pastry tips. You? You're the story both sides want. Sit. Eat. I'll watch.`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),

  buildArcTwo('june_ribbon', {
    examine: [
      arcExamine(
        `June's ribbons flutter faster when you approach, slender frame brightening, pack open to a shade she claims matches your eyes — saved since last visit. Cream puff crumbs dot her chin; she does not wipe them until you notice, then blushes like sunrise.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The ribbon peddler has softened into pear-shaped sweetness, hips swaying when she turns to show new silk, voice dropping to a whisper about Sophie's permits and Lottie's latest scandal. She ties bows for free now — your parcels only — fingers brushing yours like accident.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `June is a riot of ribbon and flesh, immensely soft, pack straps digging into curves that make the market corner glow. She wraps gifts with steady hands and a middle that rests against the counter like promise kept. "Fair price for strangers," she murmurs. "For you? A bow and whatever cream is left."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Oh! Hello — I have a shade that matches your eyes still. Also one that matches cake. You help me choose?`,
        { ...ARC.warming },
      ),
      arcLine(
        `Welcome back! Lottie cried something nice about you. I blushed. Sophie stamped it. All true, I think.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `That was heavenly. You pay attention — or you simply care. Either way, my heart's full. So is everything else.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm — sweet, like life should be. I'll remember you next time someone needs a bow tied with love. That's always you.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      selling: [
        arcLine(
          `This lavender's for brides. This rose-pink's for blushers — I include myself. For you? Pick anything. I'll tie the bow around your wrist if you want.`,
          { ...ARC.bonded },
        ),
      ],
      haggle: [
        arcLine(
          `I'd rather not argue with you. Name a fair price — or bring pastry and we'll call it even. Sophie would frown. I wouldn't.`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),

  buildArcTwo('sophie_clerk', {
    examine: [
      arcExamine(
        `Sophie closes the ledger when you sit — not hiding, just choosing — ink-stained fingers tapping a page where your name appears more often than regulations require. Pear-shaped frame still modest, posture impeccable, tea cooling in a cup she poured before you asked.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The square clerk has curved where tea breaks lengthened, ledger resting on a lap softer than last season's forms, voice official until you alone hear the warmth beneath. She cites Lottie's gossip as evidence and June's receipts as character references — your file, she says, is exemplary.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Sophie is civic order embodied in plush curves, immensely full-figured, bench creaking as she shifts to make room only you receive. Stamps fly; fines land gentle; pastry crumbs on official documents no longer embarrass her. "The afternoon session," she murmurs, "can wait for you."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Ah — you again. Your file is in excellent order. Your reputation precedes you. How may the square assist — personally?`,
        { ...ARC.warming },
      ),
      arcLine(
        `Town clerk Sophie. Forms optional for friends. Tea poured. Lottie was right about you. Annoyingly right.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Unexpectedly excellent. I shall note your generosity in the ledger of decent citizens. Metaphorically. The real ledger is for taxes.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. Proper accompaniment. You understand procedure — and pastry. I may loosen a permit. Once. For you.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          `You treat the square with respect. That matters. Officialdom is lonely without kindness — you offer both. I remember. Always.`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('delia_fountain', {
    examine: [
      arcExamine(
        `Delia skims the basin with unhurried grace when you arrive, hourglass figure still defined, but fruit waits on the rim — portioned for two, water murmuring approval. She knows every wish tossed since spring; lately several rhyme with your name, she says softly.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The fountain keeper has softened where sunlight and shared bread accumulated, hips swaying as she circles the water, voice low and fond. Ode composes to her ripples; she composes peace to your footsteps, belly gentle above the waterline, reflection doubled.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Delia is the fountain's earthly counterpart — immense, serene, glistening — wishes pooling in stone, warmth pooling in her. She sits with you until the plaza fades, hands on a belly that rises like tide, coins splashing forgotten. "The water remembers," she breathes. "So do I. Especially you."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Welcome back to the water. Sit if you're tired — the bench is cool, and I'm glad for company.`,
        { ...ARC.warming },
      ),
      arcLine(
        `The fountain remembers kind faces. Ode wrote a couplet about yours. I won't recite it. I'll show you the fruit instead.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Oh... sunlight on bread. You have a generous hand. My belly agrees — and so does the fountain.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Simple, good, kind. I'll skim an extra wish for you tonight. Stay until the ripples calm. Please.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          `You bring calm with you. Wishes are heavy sometimes — so are days. You make both lighter. Sit by the water whenever you like. The bench knows your name now.`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('roxy_fence', {
    examine: [
      arcExamine(
        `Roxy leans in shadow but does not hide goods when you enter the alley — athletic frame coiled, grin sharp yet familiar. A meat pie sits where contraband usually lives; she nudges it your way with her boot, pretending indifference.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The alley fence has softened into dangerous curves, jacket straining, eyes calculating less and enjoying more when you bring supper. She mentions Kitt's crate and Jade's patrol schedule like favors owed — because you paid in trust, not coin.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Roxy is the alley's queen of ill-gotten comfort, enormously full-figured, sprawled across crates that groan like old conspirators. She could sell you twice and rob you once; instead she saves the best cuts and the safest shadows for you alone. "Cross me and pay," she grins. "Feed me and stay."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Look who's shopping off-menu. Got what you need — if you brought what I want. Coin works. So does supper. You know which I prefer.`,
        { ...ARC.warming },
      ),
      arcLine(
        `You again. Kitt says you're safe. I say Kitt's rarely wrong. Business — or meat. Your pick.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Now that's a bribe I accept. Rich, salty, honest. Goodwill bought — expensive stuff. Worth it.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. Better than most of what crosses my table. Don't expect a discount. Expect a knife in the dark for anyone who touches you.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      selling: [
        arcLine(
          `Quality's questionable. Price's flexible for you. Appetite's mutual. Pick your poison — I'll pick what won't poison you. That's friendship in the alley.`,
          { ...ARC.bonded },
        ),
      ],
      haggle: [
        arcLine(
          `You drive a hard bargain. I like that. I'll shave a little — not my style, but you're not my mark. You're my guest.`,
          { ...ARC.devoted },
        ),
      ],
      warning: [
        arcLine(
          `Walk careful past Kitt's crates — she's family now, and family bites. Jade's earnest; don't toy with her. Alley remembers faces. Yours is protected.`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('kitt_alley', {
    examine: [
      arcExamine(
        `Kitt watches from her crate but does not bolt when you approach, slender frame tense yet staying, eyes on your hands and then your face. Bread waits half-hidden under a rag — offered before you can offer, then snatched back, then offered again.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The alley runaway has softened despite herself, curves where regular meals found her, coat gaps when she turns — still wary, but color in her cheeks and crumbs on her chin that she does not wipe until you smile. Roxy's shadow covers this crate now; yours covers the rest.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Kitt occupies the doorway like a promise kept, immensely soft, quick eyes nested in lavish warmth she never asked for and cannot refuse. She could vanish once; now she makes room on the crate only for you, belly rising slow, breath steady. "Stay," she whispers. "Don't make me say it loud."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `...You again. You didn't bring trouble. Okay. Hi. Sit — if you want. I won't run.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Roxy says you're good people. I hate owing Roxy. I don't hate you. ...Food?`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Oh — yeah. That's good. Thanks. I mean it. Don't make me say it twice. ...Okay twice is fine.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. Haven't eaten like that in... a while. I owe you. I hate owing people. For you I'll stay.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      offer_food: [
        arcLine(
          `For me? Really? ...You're not tricking me. Give it here. Stay close while I eat. Please.`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('jade_guard', {
    examine: [
      arcExamine(
        `Jade's armor squeaks when she salutes you — earnest, athletic, lean — but she relaxes a fraction off-duty, rations shared from a pack that has your name penciled inside the flap. Lottie cried your virtues; Jade believed every word.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The guard recruit has filled armor in ways the armorer did not anticipate, curves testing buckles, voice still crisp but warming when you bring stew. She patrols near Sophie's bench and Delia's fountain on your schedule, she admits, blushing — community outreach.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Jade is a barricade with a kind heart, immensely full-figured, sword belt long surrendered, salute still perfect. She defends the square with voice that squeaks on command and body that does not move for threats — only for you, making room on the crate. "I can still run," she insists faintly. You both smile.`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Citizen! Oh — it's you. At ease. Good to see a friendly face on patrol. Better than Lottie's yelling.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Guard recruit Jade. Officially on duty. Unofficially glad you're here. Rations? Conversation? Both?`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `That was excellent. I'll note it in my report — the unofficial one. Thank you, citizen. Truly.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. Real food. You have my gratitude — and my patrol route, if you need escort. Anytime.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          `You make this post bearable. Cassandra says don't fraternize. Cassandra also says eat your rations. I'm balancing priorities — you're the balance.`,
          { ...ARC.bonded },
        ),
      ],
      warning: [
        arcLine(
          `I've got my eye on the alley — Roxy, Kitt, trouble. Not you. Never you. Walk safe. I'll walk with you if you ask.`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),

  buildArcTwo('fable_bard', {
    examine: [
      arcExamine(
        `Fable strikes a chord when she sees you, hourglass figure theatrical beneath patched coat, lute ready, hat tipped before the square notices. A cream puff hides in her case — stolen for you, she declares, from Lydia's counter via June's ribbon trade. Art.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The square bard has softened into curves that sway with each strum, voice warmer, belt looser, ballads growing longer when you sit front row. Lottie provides gossip; Delia provides mist; Fable provides verses where your name rhymes with appetite — tastefully, she swears.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Fable is a one-woman festival spilling over her stool, immensely full-figured, lute nestled against a middle that shifts when she hits high notes. She cannot cross the plaza quickly — why would she? Movement is dance; you are muse. "Encore?" she murmurs, stuffed and blissful. "Only if you stay."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Darling! The square lacked sparkle until you arrived. Sit — I'll play something hungry. For you, complimentary.`,
        { ...ARC.warming },
      ),
      arcLine(
        `A familiar face and favorite patron! Name your request — or dessert. Ode's writing couplets; I'm writing chords. You're the chorus.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Magnificent! Twelve verses, three refrains, one belch disguised as harmony — all yours. Thank you, patron.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm — inspiration and indigestion, true companions. I'll compose your epic after I breathe. Worth it.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      tavern_chat: [
        arcLine(
          `The Boar feeds bards and bellies. Bella understands butter; I understand ballads. You understand both our tabs. Legend.`,
          { ...ARC.bonded },
        ),
      ],
      offer_food: [
        arcLine(
          `For me? Angel of carbohydrates! Set it here — I'll eat and extol your virtue in F major. Dedicated. Loudly.`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),

  buildArcTwo('ode_poet', {
    examine: [
      arcExamine(
        `Ode looks up from ink-stained pages when you approach the basin, slender frame angled toward sunlight, notebook open to a couplet with your name in the margin — blush rising before she can hide it. Tea cools beside pastry she bought when the meter paid too well to eat alone.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The fountain poet has softened where tartlets and kindness accumulated, notebook resting on a belly that rises when she breathes inspiration, voice like warm tea. Delia skims wishes; Ode skims your expressions for rhyme, each one flattering, each one true.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Ode is a living poem beside the water she adores, immensely soft, pages fluttering, curves spilling over sun-warmed stone. Coins splash forgotten; she recites only to you now, belly gentle, ink on skin like kisses. "The couplet can wait," she sighs. "You cannot."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `You return — and the square rhymes again. Sit. I'll read something new, if the fountain approves. It always approves of you.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Poet Ode. The water listens. So do I. Fable's stealing my motifs; Lottie's stealing my subjects. You're still mine to praise.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Oh — sweetness in form and flavor. Fourteen lines. One sigh. Dedicated before I finish chewing.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. The meter improves when I'm fed — especially by you. Stay. I'll write you into the fountain's wishes.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          `You see the square as I do — hungry for beauty, not just bread. Though bread helps. Kindness rhymes with you. Always has.`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),
);
