// https://tiermaker.com/categories/battle-cats/the-battle-cats-uber-tierlist1331-16764237
// Array.from(document.querySelectorAll("#tier-container .character"), x=>parseInt(x.style.backgroundImage.match(/uni\d+/)?.[0].slice(3))).filter(x => x);
const ranks = [543, 690, 44, 705, 71, 731, 318, 441, 439, 519, 529, 271, 75, 686, 259, 333, 226, 105, 170, 738, 283, 304, 159, 316, 417, 657, 59, 272, 396, 194, 378, 258, 632, 335, 336, 642, 380, 698, 533, 177, 269, 125, 451, 641, 196, 544, 42, 569, 138, 559, 478, 212, 585, 401, 449, 534, 286, 158, 355, 594, 463, 362, 660, 136, 493, 624, 397, 709, 758, 481, 195, 649, 322, 609, 455, 414, 305, 631, 448, 647, 261, 168, 73, 779, 107, 607, 760, 749, 359, 84, 351, 240, 360, 496, 450, 143, 725, 502, 733, 413, 83, 484, 633, 338, 124, 668, 674, 358, 618, 612, 85, 754, 435, 361, 655, 586, 549, 774, 634, 547, 427, 763, 174, 719, 34, 291, 461, 187, 746, 412, 357, 135, 515, 683, 551, 625, 721, 715, 354, 106, 587, 777, 506, 737, 769, 274, 714, 570, 331, 270, 487, 466, 710, 563, 456, 275, 341, 661, 223, 241, 693, 666, 345, 230, 229, 510, 759, 620, 302, 644, 330, 536, 772, 588, 438, 582, 180, 482, 680, 242, 748, 687, 243, 600, 596, 583, 550, 692, 590, 494, 681, 575, 188, 747, 736, 595, 574, 310, 584, 290, 560, 699, 564, 512, 548, 614, 514, 711, 572, 368, 185, 346, 768, 756, 530, 597, 468, 186, 471, 573, 292, 648, 485, 727, 467, 469, 488, 288, 722, 741, 72, 599, 526, 225, 224, 619, 394, 119, 535, 364, 517, 513, 470, 363, 511, 366, 365, 161, 337, 415, 712, 222, 66, 555, 326, 671, 537, 367, 571, 598, 431, 395, 783, 516, 416, 393, 778, 289, 440, 791, 787, 682, 762, 781, 137, 786, 43, 789, 76, 792, 617, 171, 334, 169, 793, 790, 306, 525, 87, 436, 57, 803, 505, 134, 546, 723, 806, 203, 257, 86, 804, 805, 799];
// let x = 0; Array.from(document.querySelectorAll("#tier-container .tier-row")).reduce((acc, y) => { x += y.querySelectorAll(".character").length; acc[x] = y.querySelector(".label").innerText; return acc; }, {});
/** @type {Map<number, string>} */
const tiers = {
	7: "S+",
	13: "S",
	17: "S-",
	45: "A+",
	70: "A",
	94: "B+",
	131: "B",
	173: "C",
	271: "D",
	306: "F"
};

const owned = new Set([
	/**
	 * https://battlecats.miraheze.org/wiki/Category:Normal_Cats
	 */
	0, // Cat
	1, // Tank Cat
	2, // Axe Cat
	3, // Gross Cat
	4, // Cow Cat
	5, // Bird Cat
	6, // Fish Cat
	7, // Lizard Cat
	8, // Titan Cat
	643, // Superfeline
	/**
	 * https://battlecats.miraheze.org/wiki/Category:Special_Cats
	 */
	// Purchasable Cats
	18, // Ninja Cat
	21, // Sumo Cat
	20, // Samurai Cat
	19, // Zombie Cat
	14, // Cats in a Box
	22, // Boogie Cat
	12, // Bondage Cat
	13, // Dom Cat
	10, // Kung Fu Cat
	9, // Actress Cat
	23, // Skirt Cat
	15, // Panties Cat
	11, // Mr.
	// Legend Cats
	24, // Valkyrie Cat
	25, // Bahamut Cat
	437, // Cat God the Great
	462, // Filibuster Cat X
	622, // Jagando Jr.
	130, // Ururun Wolf
	172, // Li'l Nyandam
	268, // Red Riding Mina
	323, // Miyamoku Musashi
	426, // Mecha-Bun
	352, // Hermit Cat
	383, // Masked Yulala
	554, // Master Uril
	// Bonus Cats
	17, // Tricycle Cat
	127, // Flower Cat
	16, // Moneko
	123, // Bean Cats
	418, // Crazed Moneko
	213, // Catburger
	689, // Meditation Cat
	// Li'l Cats
	209, // Li'l Cat
	210, // Li'l Tank Cat
	211, // Li'l Axe Cat
	245, // Li'l Gross Cat
	246, // Li'l Cow Cat
	247, // Li'l Bird Cat
	311, // Li'l Fish Cat
	312, // Li'l Lizard Cat
	313, // Li'l Titan Cat
	// Event Capsule Cats
	650, // Secret Crush Cat
	651, // Tomboy Lion Cat
	652, // Chalkboard Eraser Cat
	696, // Class Rep Cat
	82, // Blue Shinobi
	646, // Firecracker Cat
	615, // Kabuto Cat
	616, // Kuwagata Cat
	// Ancient Eggs
	656, // Ancient Egg: N001 / Haniwa Cat
	669, // Ancient Egg: N003 / Cat Cactus
	685, // Ancient Egg: N004 / Supercar Cat
	700, // Ancient Egg: N005 / Hitman Cat
	// 720, // Ancient Egg: N006 / Fallen Bear Cat
	665, // Ancient Egg: N201 / Exorcist Cat
	670, // Ancient Egg: N202 / Armored Firefly Cat
	713, // Ancient Egg: N203 / Clown Cat
	730, // Ancient Egg: N204 / Lion Dancer Cat
	757, // Ancient Egg: N205 / Bride Cat
	765, // Ancient Egg: N206 / Clam Cat
	// Limited Event Cats
	342, // Maneki Cat
	375, // Coin Cat
	381, // Farmer Cat
	// 558, // Gacha Cat
	735, // Principal Cat
	610, // Gold Brick Cat
	740, // Trash Cat
	766, // Sardine
	767, // Squid
	// Collaboration Event Cats
	130, // Cabaret Cat
	120, // Healer
	121, // Merc
	191, // Titi
	175, // Meowla Meowla
	300, // Li'l Homura
	744, // Felix the Cat Duke Cat
	753, // Kaoru Cat
	795, // Li'l Baki
	796, // Baki Cat
	797, // Kaioh Cat
	798, // Doppo Cat
	/**
	 * https://battlecats.miraheze.org/wiki/Category:Rare_Cats
	 */
	// Anti-Red
	47, // Viking Cat
	58, // Swordsman Cat
	55, // Witch Cat
	48, // Pirate Cat
	495, // Matador Cat
	// Anti-Floating
	56, // Archer Cat
	149, // Mer-Cat
	50, // Bishop Cat
	51, // Fortune Teller Cat
	52, // Shaman Cat
	// Anti-Black
	145, // Cat Gunslinger
	147, // Tin Cat
	// Anti-Metal
	46, // Jurassic Cat
	// Anti-Angel
	148, // Rocker Cat
	146, // Stilts Cat
	// Anti-Alien
	197, // Psychocat
	38, // Wheel Cat
	376, // Rover Cat
	// Anti-Zombie
	308, // Gardener Cat
	325, // Welterweight Cat
	523, // Wushu Cat
	// Miscellaneous
	37, // Pogo Cat
	41, // Salon Cat
	49, // Thief Cat
	198, // Onmyoji Cat
	// Monthly Event Cats
	79, // Adult Cat
	80, // Evil Cat
	100, // Maiden Cat
	104, // Koi Cat
	122, // Vacation Queen
	70, // Salaryman Cat
	81, // Doll Cats
	109, // Madam Bride
	128, // Vengeful Cat
	132, // Kung Fu Cat X
	63, // Sports Day Cat
	74, // Reindeer Fish Cat
	// Celebration/Annually Event Cats
	176, // Marshmallow Cat
	319, // Killer Cat
	329, // Eggy Cat
	282, // Awa-Odori Cat
	343, // Slug Jockey Cat
	227, // Pumpcat
	303, // Food Stall Cat
	244, // A Gift of Cats
	138, // Cat Kart R
	501, // Cat Bros
	695, // Killer Tank Cat
	// Cyclone Stage Rewards
	78, // Space Cat
	60, // Bronze Cat
	88, // Rope Jump Cat
	126, // Clockwork Cat
	154, // Hoop Cat
	201, // Drumcorps Cat
	379, // Volley Cat
	452, // Primordial Cat
	621, // Aku Researcher
	// Advent Stage Rewards
	324, // Curling Cat
	382, // Glass Cat
	442, // Lone Cat and Kitten
	521, // Medusa Cat
	507, // Mightycat
	539, // Rugby Cat
	527, // Slime Cat
	528, // Cossack Cat
	531, // Teacher BearCat
	545, // Phantom Cat
	553, // Bakery Cat
	581, // Stone Cat
	623, // Pied Piper Cat
	630, // Calligraphy Cat
	// 708, // Jetpack Cat
	718, // Maize Cat
	// 780, // Bowler Cat
	// Ancient Eggs
	658, // Ancient Egg: N101 / Courier Cat
	659, // Ancient Egg: N102 / Catarzan
	663, // Ancient Egg: N103 / Gas Mask Cat
	664, // Ancient Egg: N104 / Surgeon Cat
	675, // Ancient Egg: N105 / Racquet Cat
	676, // Ancient Egg: N106 / Mushroom Cat
	697, // Ancient Egg: N107 / Cat Chief
	707, // Ancient Egg: N109 / Barrel Cat
	717, // Ancient Egg: N110 / Farmboy Cat
	// 716, // Ancient Egg: N111 / Cop Cat
	// 724, // Ancient Egg: N112 / Cat Egg Pod
	// Collaboration Event Cats
	110, // Celesse
	111, // Nono
	112, // Olga
	113, // Norn
	114, // Yoichi
	115, // Serum
	116, // Fuu
	214, // HYAKUTARO
	215, // MARCO
	216, // TARMA
	217, // ERI
	218, // FIO
	221, // MARS PEOPLE
	294, // Madoka Cat
	295, // Homura Cat
	296, // Sayaka Cat
	297, // Mami Cat
	298, // Kyoko Cat
	299, // Li'l Madoka
	301, // Kyubey Cat
	538, // Miku Cat
	752, // Kenshin Cat
	742, // Mollyanna Cat
	743, // Madhead
	/**
	 * https://battlecats.miraheze.org/wiki/Category:Super_Rare_Cats
	 */
	32, // Hip Hop Cat
	61, // Sushi Cat
	35, // Nerd Cat
	33, // Kotatsu Cat
	39, // Apple Cat
	36, // Swimmer Cat
	40, // Bath Cat
	31, // Delinquent Cat
	30, // Bodhisattva Cat
	150, // Juliet Cat
	151, // Weightlifter Cat
	152, // Figure Skating Cats
	153, // Cat Toaster
	199, // Surfer Cat
	307, // Vaulter Cat
	377, // Fencer Cat
	522, // Nymph Cat
	443, // Driller Cat
	444, // Piledriver Cat
	445, // Cutter Cat
	446, // Backhoe Cat
	447, // Miter Saw Cat
	237, // Freshman Cat Jobs
	239, // Sniper the Recruit
	238, // Rich Cat III
	129, // Gold Cat
	131, // Neneko
	144, // Cat Base Mini
	200, // Metal Cat
	// Seasonal
	228, // Gloomy Neneko
	589, // Valentine's Neneko
	566, // Lifeguard Cats
	// Brainwashed Cats
	636, // Brainwashed Tank Cat
	662, // Brainwashed Cow Cat
	667, // Brainwashed Bird Cat
	684, // Brainwashed Fish Cat
	694, // Brainwashed Titan Cat
	// Crazed Cats
	91, // Crazed Cat
	92, // Crazed Tank Cat
	93, // Crazed Axe Cat
	94, // Crazed Gross Cat
	95, // Crazed Cow Cat
	96, // Crazed Bird Cat
	97, // Crazed Fish Cat
	98, // Crazed Lizard Cat
	99, // Crazed Titan Cat
	// Cyclone Stage Rewards
	267, // Catornado
	273, // Cheerleader Cat
	// Advent Stage Rewards
	260, // Catway
	284, // Express Cat
	287, // Little Leaguer Cat
	// Behemoth Culling Rewards
	706, // Ancient Egg: N108 / Soap Cat
	// Collaboration Event Cats
	117, // Aura
	118, // Rei
	189, // Alois
	190, // Citrouille
	344, // Orthos
	220, // ALLEN O'NEIL
	219, // SV-001
	293, // Kyubey
	794, // Ogre Cat
	/**
	 * https://battlecats.miraheze.org/wiki/Category:Uber_Rare_Cats
	 */
	// The Dynamites
	42, // Ice Cat
	43, // Cat Machine
	756, // Cake Machine
	44, // Lesser Demon Cat
	59, // Baby Cat
	519, // Lasvoss
	617, // Summoner Satoru
	// Tales of the Nekoluga
	34, // Nekoluga
	171, // Balaluga
	625, // Furiluga
	// Sengoku Wargods Vajiras
	71, // Sanada Yukimura
	72, // Maeda Keiji
	73, // Oda Nobunaga
	124, // Date Masamune
	338, // Imagawa Yoshimoto
	618, // Shiro Amakusa
	649, // Hattori Hanzo
	// Cyber Academy Galaxy Gals
	105, // Kuu
	106, // Kai
	619, // Lilin
	// Lords of Destruction Dragon Emperors
	84, // Megidora
	660, // Sea Serpent Daliasan
	// Ancient Heroes Ultra Souls
	136, // Momotaro
	138, // Princess Kaguya
	137, // Kasa Jizo
	633, // Shitakiri Sparrow
	692, // Issun Boshi
	769, // Hanasaka Cat
	// Dark Heroes
	196, // Catman
	212, // The White Rabbit
	226, // Warlock and Pierre
	261, // Hayabusa
	431, // Detective Vigler
	533, // Sharpshooter Saki
	634, // White Knight Cyclops
	698, // Thunder Jack
	// The Almighties The Majestic Zeus
	257, // Thunder God Zeus
	259, // Radiant Aphrodite
	271, // Shining Amaterasu
	272, // Splendid Ganesha
	316, // Wrathful Poseidon
	439, // Empress Chronos
	534, // Hades the Punisher
	642, // Lucifer the Fallen
	723, // Lightmother Aset
	// Frontline Assault Iron Legion
	304, // Mighty Kat-A-Pult
	355, // Mighty Rekon Korps
	417, // Mighty Thermae D-Lux
	632, // Mighty Deth-Troy-R
	// Nature's Guardians Elemental Pixies
	359, // Bora
	401, // Voli
	655, // Bliza
	719, // Tekachi
	// Merc Storia
	119, // Wyvern
	185, // Hearscht
	// 186, // Cornelia
	187, // Juvens
	// 188, // Mystica
	345, // Michelia
	346, // Todomeki
	506, // Eyewaltz
	// 768, // Taitenki
	// Metal Slug
	222, // HUGE HERMIT
	223, // JUPITER KING
	224, // DONALD MORDEN
	225, // HI-DO
	727, // SOL DAE ROKKER
	// Puella Magi Madoka Magica
	288, // Madoka Kaname
	289, // Homura Akemi
	290, // Sayaka Miki
	291, // Mami Tomoe
	292, // Kyoko Sakura
	440, // Bebe
	778, // Madoka Cat & Homura
	// River City Clash Capsules
	624, // Kunio-kun
	721, // High School Kingpin Riki
	// Baki Hanma
	789, // Baki Hanma
	790, // Retsu Kaioh
	791, // Kaoru Hanayama
	792, // Katsumi Orochi
	793, // Jack Hammer
	// Halloween Capsules
	229, // Hallowindy
	230, // Spooky Thundia
	// Girls & Monsters: Angels of Terror
	334, // Trickster Himeyuri
	336, // Queen Reika
	358, // Graveflower Verbena
	607, // Adventurer Kanna
	// White Day Capsules
	786, // The Amazing Catman
	// NEO Best of the Best
	484, // Li'l Valkyrie Dark
	// UBERFEST
	318, // Miko Mitama
	380, // D'artanyan
	585, // Baby Garu
	641, // Iz the Dancer
	690, // Child of Destiny Phono
	// EPICFEST
	333, // Shadow Gao
	378, // Dark Mitama
	543, // Kasli the Bane
	705, // King of Doom Phono
	// RoyalFest
	612, // Princess Cat
	// BUSTERFEST
	283, // Pai-Pai
	397, // Sakura Sonic
	// Tower of Saviors
	741, // Voluptuous Peony - Daji
	/**
	 * https://battlecats.miraheze.org/wiki/Category:Legend_Rare_Cats
	 */
	451, // Ushiwakamaru
	493, // Gaia the Creator
	463, // Mighty Kristul Muu
	478, // Lumina
	544, // Kyosaka Nanaho
	461, // Legeluga
	731, // Daybreaker Izanagi
]);

/**
 * Get Cat Names
 * @param {number} catID 
 * @returns {Array<string>}
 */
async function getCat(catID) {
	const resp = JSON.parse((await (
		await fetch(`https://battlecats.miraheze.org/w/api.php?action=query&format=json&prop=revisions&titles=MediaWiki%3ACustom-AnimationViewer%2F${String(catID).padStart(3, "0")
			}.json&rvprop=content&rvslots=main&formatversion=2`)
	).json()).query.pages[0].revisions[0].slots.main.content);
	return [
		...(resp.f ? [resp.f.name] : []),
		...(resp.c ? [resp.c.name] : []),
		...(resp.s ? [resp.s.name] : []),
		...(resp.u ? [resp.u.name] : []),
	];
};

if (window.location.href.startsWith("https://battlecats.miraheze.org/wiki/Category"))
	document.querySelectorAll(".gacha-banner").forEach(banner => {
		/** @type {HTMLDivElement} */
		const collapsible = banner.querySelector("div > i > b");

		/** @type {NodeListOf<HTMLDivElement} */
		(banner.querySelectorAll(".collapsible-units")).forEach((stage, index) => {
			const units = Array.from(stage.querySelectorAll("img")).map(unit => {
				const catNum = parseInt(unit.src.match(/Uni(\d{3})/)[1]);
				const catRank = ranks.indexOf(catNum) + 1;
				const isOwned = owned.has(catNum);
				unit.style.backgroundColor = isOwned ? "green" : "red";
				unit.alt += ` (${isOwned ? "O" : "U"} ${tiers[Object.keys(tiers).find(x => catRank <= x)]} ${catRank})`;
				unit.parentElement.title = unit.alt;
				return isOwned;
			});
			if (!index)
				collapsible.innerText = `${units.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
					}/${units.length}\t${collapsible.innerText}`
		});
	});
else if (
	["(Normal_Cat)", "(Special_Cat)", "(Rare_Cat)", "(Super_Rare_Cat)", "(Uber_Rare_Cat)", "(Legend_Rare_Cat)"]
		.map(x => window.location.href.endsWith(x)).some(x => x)
) {
	const catNum = parseInt(document.querySelector("#citizen-section-0 > aside > h2 > b:nth-child(1)").lastChild.previousSibling.data);
	const catRank = ranks.indexOf(catNum) + 1;
	document.querySelector("#firstHeading > span > span").innerText +=
		` (${owned.has(catNum) ? "O" : "U"}${catRank ? ` ${tiers[Object.keys(tiers).find(x => catRank <= x)]} ${catRank}` : ""
		})`;
}
