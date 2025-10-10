"use strict";

(function() {
	// https://tiermaker.com/categories/battle-cats/the-battle-cats-uber-tierlist1331-16764237
	// Array.from(document.querySelectorAll("#tier-container .character"), x=>parseInt(x.style.backgroundImage.match(/uni\d+/)?.[0].slice(3))).filter(x => x);
	const ranks = [543, 690, 44, 705, 71, 731, 318, 441, 519, 75, 439, 529, 271, 686, 304, 333, 226, 259, 59, 105, 170, 316, 159, 738, 657, 272, 194, 177, 283, 417, 258, 396, 269, 125, 335, 378, 533, 451, 380, 642, 336, 641, 138, 559, 196, 42, 544, 569, 212, 585, 158, 534, 478, 758, 397, 401, 649, 362, 594, 449, 286, 355, 709, 660, 305, 136, 624, 481, 609, 322, 463, 195, 493, 448, 779, 414, 631, 73, 455, 647, 168, 749, 607, 359, 760, 351, 135, 84, 496, 107, 618, 240, 413, 450, 725, 633, 338, 733, 83, 124, 502, 668, 143, 754, 484, 549, 174, 612, 358, 746, 674, 435, 361, 774, 547, 291, 106, 683, 187, 655, 763, 515, 34, 586, 427, 412, 461, 719, 506, 551, 721, 466, 331, 587, 345, 72, 274, 777, 354, 620, 737, 769, 692, 563, 456, 270, 341, 570, 487, 431, 710, 714, 510, 241, 223, 666, 661, 759, 180, 693, 583, 229, 644, 582, 590, 482, 330, 536, 230, 302, 756, 681, 680, 512, 310, 748, 783, 699, 600, 619, 584, 288, 550, 560, 188, 595, 438, 588, 772, 747, 488, 572, 712, 614, 242, 574, 575, 736, 596, 471, 687, 243, 290, 768, 573, 468, 185, 467, 494, 597, 548, 741, 469, 292, 564, 514, 346, 787, 224, 368, 119, 648, 530, 470, 711, 727, 394, 76, 511, 186, 225, 791, 535, 485, 415, 599, 366, 722, 337, 363, 364, 367, 526, 513, 222, 365, 326, 161, 555, 671, 66, 537, 598, 395, 289, 571, 516, 778, 682, 416, 393, 43, 137, 440, 617, 781, 171, 762, 786, 625, 334, 789, 792, 169, 57, 806, 793, 525, 87, 698, 810, 803, 505, 306, 799, 203, 134, 790, 723, 436, 261, 257, 805, 86, 632, 85, 804, 815, 811, 546, 814, 360, 820, 275, 357, 634, 824];
	// let x = 0; Array.from(document.querySelectorAll("#tier-container .tier-row")).reduce((acc, y) => { x += y.querySelectorAll(".character").length; acc[x] = y.querySelector(".label").innerText; return acc; }, {});
	/** @type {Map<number, string>} */
	const tiers = {
		"7": "SS", "11": "S+", "18": "S", "41": "A+", "67": "A", "90": "B+", "127": "B", "169": "C", "268": "D", "310": "F"
	};

	// --- Start of Storage Logic ---
	const ownedStorageKey = "battleCatsOwned";

	// The default set of owned cats if none is found in storage.
	const defaultOwnedSet = new Set();

	/** @type {Set<number>} */
	let owned;

	/**
	 * Saves the current 'owned' set to the browser's local storage.
	 */
	function saveOwned() {
		try {
			localStorage.setItem(ownedStorageKey, JSON.stringify(Array.from(owned)));
		} catch (e) {
			console.error("Failed to save owned cats data:", e);
		}
	}

	/**
	 * Loads the 'owned' set from local storage. If not found, initializes with defaults.
	 */
	function loadOwned() {
		const storedData = localStorage.getItem(ownedStorageKey);
		if (storedData) {
			try {
				owned = new Set(JSON.parse(storedData));
			} catch (e) {
				console.error("Failed to parse owned cats data, using defaults.", e);
				owned = defaultOwnedSet;
			}
		} else {
			owned = defaultOwnedSet;
			saveOwned();
		}
	}

	/**
	 * Toggle the 'owned' status of the specified catNum
	 */
	function toggleOwned(catNum) {
		if (owned.has(catNum)) {
			owned.delete(catNum);
		} else {
			owned.add(catNum);
		}
		saveOwned();
	}

	// Initial load of owned cats data.
	loadOwned();
	// --- End of Storage Logic ---

	if (window.location.href.startsWith("https://battlecats.miraheze.org/wiki/Category")) {
		document.querySelectorAll(".gacha-banner").forEach(banner => {
			const collapsible = banner.querySelector("div > i > b");
			if (!collapsible) return;

			// Store original text if not already stored to make script idempotent
			if (!collapsible.dataset.originalText) {
				collapsible.dataset.originalText = collapsible.innerText.trim();
			}
			const originalBannerText = collapsible.dataset.originalText;

			// Get all images that represent cat units.
			const allCatImages = Array.from(banner.querySelectorAll(".collapsible-units img"))
				.filter(img => /Uni(\d{3})/.test(img.src));

			if (allCatImages.length === 0) return; // No units to process in this banner

			// Create a set of unique cat IDs from all images in the banner to get a correct total.
			const uniqueCatNumbersInBanner = new Set();
			allCatImages.forEach(img => {
				const match = img.src.match(/Uni(\d{3})/);
				if (match && match[1]) {
					uniqueCatNumbersInBanner.add(parseInt(match[1], 10));
				}
			});

			const totalCount = uniqueCatNumbersInBanner.size;
			if (totalCount === 0) return;

			const updateBannerCount = () => {
				// Count how many of the *unique* cats in this banner are owned.
				const ownedCount = [...uniqueCatNumbersInBanner].filter(catNum => owned.has(catNum)).length;
				collapsible.innerText = `${ownedCount}/${totalCount}\t${originalBannerText}`;
			};

			// This loop sets up the visuals and click handlers for EACH image.
			allCatImages.forEach(unit => {
				const match = unit.src.match(/Uni(\d{3})/);
				const catNum = parseInt(match[1], 10);
				unit.dataset.catNum = catNum; // Store for easy access

				const updateUnitVisuals = (targetUnit) => {
					const isOwned = owned.has(catNum);
					const catRank = ranks.indexOf(catNum) + 1;
					targetUnit.style.backgroundColor = isOwned ? "green" : "red";

					const baseAlt = targetUnit.alt.includes("(") ? targetUnit.alt.slice(0, targetUnit.alt.indexOf("(")).trim() : targetUnit.alt;
					const rankInfo = catRank ? `${tiers[Object.keys(tiers).find(x => catRank <= x)]} ${catRank}` : "";
					targetUnit.alt = `${baseAlt} (${isOwned ? "O" : "U"} ${rankInfo})`.trim();

					if(targetUnit.parentElement) {
					   targetUnit.parentElement.title = targetUnit.alt;
					}
				};

				// Set initial state for this specific image
				updateUnitVisuals(unit); 

				unit.addEventListener("click", e => {
					if (e.altKey) {
						e.preventDefault();
						e.stopPropagation();
						toggleOwned(catNum);

						// Find ALL images for this cat in the current banner and update them
						const imagesToUpdate = banner.querySelectorAll(`img[data-cat-num="${catNum}"]`);
						imagesToUpdate.forEach(imgToUpdate => updateUnitVisuals(imgToUpdate));

						// Update the main counter
						updateBannerCount();
					}
				});
			});

			updateBannerCount(); // Set initial banner count
		});
	} else if (window.location.href === "https://battlecats.miraheze.org/wiki/Cat_Guide/Units") {
		fetch("https://battlecats.miraheze.org/wiki/Module:Cats/images.csv?action=raw")
			.then(r => r.text())
			.then(data => {
				const eggs = Object.fromEntries(data.trim().split("\n").slice(1).map(x => [x.slice(8).split("(")[0].trim(), parseInt(x.slice(0, 3), 10)]));
				document.querySelectorAll(".nyanko img").forEach(unit => {
					let catNum;
					const srcMatch = unit.src.match(/Uni(\d{3})/);
					if (unit.src === "https://static.wikitide.net/battlecatswiki/7/70/Uni000_m00.png") {
						catNum = eggs[unit.alt];
					} else if (srcMatch) {
						catNum = parseInt(srcMatch[1], 10);
					}

					if (catNum === undefined || isNaN(catNum)) return;

					unit.dataset.catNum = catNum;

					const updateUnitVisuals = () => {
						const isOwned = owned.has(catNum);
						unit.style.backgroundColor = isOwned ? "green" : "red";
						unit.title = isOwned ? "Owned (Alt+Click to toggle)" : "Unowned (Alt+Click to toggle)";
					};

					unit.addEventListener("click", e => {
						if (e.altKey) {
							e.preventDefault();
							e.stopPropagation();
							toggleOwned(catNum);
							updateUnitVisuals();
						}
					});

					updateUnitVisuals();
				});
			});
	} else if (
		["(Normal_Cat)", "(Special_Cat)", "(Rare_Cat)", "(Super_Rare_Cat)", "(Uber_Rare_Cat)", "(Legend_Rare_Cat)"]
		.some(x => window.location.href.endsWith(x))
	) {
		const headingSpan = document.querySelector("#firstHeading > span > span");
		const catNumElem = document.querySelector("#citizen-section-0 > aside > h2 > b:nth-child(1)");

		if (headingSpan && catNumElem && catNumElem.lastChild.previousSibling) {
			const catNum = parseInt(catNumElem.lastChild.previousSibling.data, 10);
			if (isNaN(catNum)) return;

			// Avoid adding button multiple times if script reruns
			if (headingSpan.querySelector(".ownership-toggle-button")) return;

			const catRank = ranks.indexOf(catNum) + 1;

			const rankText = catRank ? ` ${tiers[Object.keys(tiers).find(x => catRank <= x)]} ${catRank}` : "";
			// Avoid adding text multiple times
			if (!headingSpan.textContent.includes(rankText.trim())) {
				 headingSpan.innerText += ` (${rankText.trim()})`;
			}

			const toggleButton = document.createElement("button");
			toggleButton.className = "ownership-toggle-button";
			toggleButton.style.marginLeft = "1rem";
			toggleButton.style.padding = "0.5rem";
			toggleButton.style.border = "0.1rem solid var(--color-subtle)";
			toggleButton.style.borderRadius = "0.5rem";
			toggleButton.style.color = "white";
			toggleButton.style.fontWeight = "bold";
			toggleButton.style.cursor = "pointer";
			toggleButton.style.verticalAlign = "middle";

			const updateButtonState = () => {
				const isOwned = owned.has(catNum);
				toggleButton.textContent = isOwned ? "Owned" : "Unowned";
				toggleButton.style.backgroundColor = isOwned ? "green" : "red";
				toggleButton.title = `Click to mark as ${isOwned ? "Unowned" : "Owned"}`;
			};

			toggleButton.addEventListener("click", () => {
				toggleOwned(catNum);
				updateButtonState();
			});

			updateButtonState();
			headingSpan.appendChild(toggleButton);
		}
	}
})();