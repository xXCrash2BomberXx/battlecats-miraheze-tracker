"use strict";

(function() {
	// https://tiermaker.com/categories/battle-cats/the-battle-cats-uber-tierlist1331-16764237
	// Array.from(document.querySelectorAll("#tier-container .character"), x=>parseInt(x.style.backgroundImage.match(/uni\d+/)?.[0].slice(3))).filter(x => x);
	const ranks = [543, 44, 690, 705, 71, 731, 519, 318, 441, 75, 439, 529, 59, 304, 686, 105, 272, 258, 259, 316, 177, 170, 333, 226, 194, 159, 657, 738, 559, 269, 138, 380, 417, 283, 451, 378, 396, 335, 569, 779, 641, 125, 135, 534, 533, 642, 158, 336, 196, 544, 585, 42, 758, 478, 649, 212, 660, 355, 397, 305, 709, 286, 401, 322, 493, 136, 195, 463, 449, 594, 609, 481, 106, 359, 73, 362, 448, 631, 455, 749, 607, 647, 624, 431, 414, 618, 351, 72, 168, 84, 240, 107, 174, 450, 760, 496, 338, 725, 733, 668, 83, 746, 361, 484, 502, 586, 612, 435, 124, 774, 413, 358, 655, 683, 763, 754, 143, 76, 291, 547, 461, 674, 692, 34, 787, 427, 783, 466, 515, 549, 620, 187, 719, 619, 712, 506, 412, 769, 625, 510, 791, 261, 551, 331, 721, 587, 563, 345, 777, 274, 737, 617, 354, 288, 714, 43, 570, 270, 171, 341, 682, 223, 661, 241, 710, 487, 229, 456, 759, 666, 644, 810, 698, 310, 583, 180, 693, 756, 230, 330, 582, 512, 699, 590, 536, 482, 772, 306, 614, 302, 334, 438, 560, 681, 687, 595, 242, 680, 488, 550, 748, 494, 471, 290, 588, 600, 188, 736, 243, 185, 768, 648, 572, 747, 469, 632, 574, 575, 564, 468, 467, 596, 548, 573, 360, 292, 346, 535, 597, 485, 741, 514, 394, 119, 526, 530, 224, 727, 470, 186, 723, 722, 368, 711, 57, 337, 222, 436, 525, 366, 225, 511, 415, 599, 546, 169, 363, 367, 364, 161, 513, 66, 781, 537, 326, 555, 289, 365, 87, 671, 516, 395, 357, 778, 598, 134, 571, 85, 505, 393, 416, 203, 786, 440, 815, 715, 762, 811, 806, 803, 257, 799, 789, 86, 792, 793, 634, 817, 790, 805, 804, 824, 820, 814, 275, 830, 827, 836, 826, 517];
	// let x = 0; Array.from(document.querySelectorAll("#tier-container .tier-row")).reduce((acc, y) => { x += y.querySelectorAll(".character").length; acc[x] = y.querySelector(".label").innerText; return acc; }, {});
	/** @type {Map<number, string>} */
	const tiers = {
		"5": "SS", "11": "S+", "17": "S", "35": "A+", "61": "A", "84": "B+", "123": "B", "159": "C", "285": "D", "318": "F"
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
				document.querySelectorAll(".units-panel img").forEach(unit => {
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