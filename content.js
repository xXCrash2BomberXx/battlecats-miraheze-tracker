"use strict";

(function() {
	// https://tiermaker.com/categories/battle-cats/the-battle-cats-uber-tierlist1331-16764237
	// Array.from(document.querySelectorAll("#tier-container .character"), x=>parseInt(x.style.backgroundImage.match(/uni\d+/)?.[0].slice(3))).filter(x => x);
	const ranks = [543, 690, 44, 705, 71, 731, 318, 441, 439, 519, 529, 271, 75, 686, 259, 333, 226, 105, 170, 738, 283, 304, 159, 316, 417, 657, 59, 272, 396, 194, 378, 258, 632, 335, 336, 642, 380, 698, 533, 177, 269, 125, 451, 641, 196, 544, 42, 569, 138, 559, 478, 212, 585, 401, 449, 534, 286, 158, 355, 594, 463, 362, 660, 136, 493, 624, 397, 709, 758, 481, 195, 649, 322, 609, 455, 414, 305, 631, 448, 647, 261, 168, 73, 779, 107, 607, 760, 749, 359, 84, 351, 240, 360, 496, 450, 143, 725, 502, 733, 413, 83, 484, 633, 338, 124, 668, 674, 358, 618, 612, 85, 754, 435, 361, 655, 586, 549, 774, 634, 547, 427, 763, 174, 719, 34, 291, 461, 187, 746, 412, 357, 135, 515, 683, 551, 625, 721, 715, 354, 106, 587, 777, 506, 737, 769, 274, 714, 570, 331, 270, 487, 466, 710, 563, 456, 275, 341, 661, 223, 241, 693, 666, 345, 230, 229, 510, 759, 620, 302, 644, 330, 536, 772, 588, 438, 582, 180, 482, 680, 242, 748, 687, 243, 600, 596, 583, 550, 692, 590, 494, 681, 575, 188, 747, 736, 595, 574, 310, 584, 290, 560, 699, 564, 512, 548, 614, 514, 711, 572, 368, 185, 346, 768, 756, 530, 597, 468, 186, 471, 573, 292, 648, 485, 727, 467, 469, 488, 288, 722, 741, 72, 599, 526, 225, 224, 619, 394, 119, 535, 364, 517, 513, 470, 363, 511, 366, 365, 161, 337, 415, 712, 222, 66, 555, 326, 671, 537, 367, 571, 598, 431, 395, 783, 516, 416, 393, 778, 289, 440, 791, 787, 682, 762, 781, 137, 786, 43, 789, 76, 792, 617, 171, 334, 169, 793, 790, 306, 525, 87, 436, 57, 803, 505, 134, 546, 723, 806, 203, 257, 86, 804, 805, 799];
	// let x = 0; Array.from(document.querySelectorAll("#tier-container .tier-row")).reduce((acc, y) => { x += y.querySelectorAll(".character").length; acc[x] = y.querySelector(".label").innerText; return acc; }, {});
	/** @type {Map<number, string>} */
	const tiers = {
		7: "S+", 13: "S", 17: "S-", 45: "A+", 70: "A", 94: "B+", 131: "B", 173: "C", 271: "D", 306: "F"
	};

	// --- Start of Storage Logic ---
	const ownedStorageKey = "battleCatsOwned";

	// The default set of owned cats if none is found in storage.
	const defaultOwnedSet = new Set([
		0, 1, 2, 3, 4, 5, 6, 7, 8, 643, 18, 21, 20, 19, 14, 22, 12, 13, 10, 9, 23, 15, 11, 24, 25, 437, 462, 622, 130, 172, 268, 323, 426, 464, 352, 383, 554, 17, 127, 16, 123, 418, 213, 689, 209, 210, 211, 245, 246, 247, 311, 312, 313, 650, 651, 652, 696, 82, 646, 615, 616, 656, 669, 685, 700, 665, 670, 713, 730, 757, 765, 342, 375, 381, 735, 610, 635, 740, 766, 767, 103, 120, 121, 191, 175, 300, 744, 753, 795, 796, 797, 798, 47, 58, 55, 48, 495, 56, 149, 50, 51, 52, 145, 147, 46, 148, 146, 197, 38, 376, 308, 325, 523, 37, 41, 49, 198, 79, 80, 100, 104, 122, 70, 81, 109, 128, 132, 63, 74, 176, 319, 329, 282, 343, 227, 303, 244, 138, 501, 695, 78, 60, 88, 126, 154, 201, 379, 452, 621, 324, 382, 442, 521, 507, 539, 527, 528, 531, 545, 553, 581, 623, 630, 718, 658, 659, 663, 664, 675, 676, 697, 707, 717, 110, 111, 112, 113, 114, 115, 116, 183, 214, 215, 216, 217, 218, 221, 294, 295, 296, 297, 298, 299, 301, 538, 752, 742, 743, 32, 61, 35, 33, 39, 36, 40, 31, 30, 150, 151, 152, 153, 199, 307, 377, 522, 443, 444, 445, 446, 447, 237, 239, 238, 129, 131, 144, 200, 228, 589, 566, 773, 636, 662, 667, 684, 694, 91, 92, 93, 94, 95, 96, 97, 98, 99, 267, 273, 260, 284, 287, 706, 117, 118, 189, 190, 344, 220, 219, 293, 794, 42, 43, 756, 44, 59, 519, 617, 34, 171, 625, 71, 72, 73, 124, 338, 618, 649, 75, 105, 106, 619, 84, 660, 136, 138, 137, 633, 692, 769, 196, 212, 226, 261, 431, 533, 634, 698, 257, 259, 271, 272, 316, 439, 534, 642, 723, 304, 355, 417, 632, 359, 401, 631, 655, 719, 119, 185, 187, 345, 346, 506, 222, 223, 224, 225, 727, 288, 289, 290, 291, 292, 440, 778, 624, 721, 789, 790, 791, 792, 793, 229, 230, 334, 336, 358, 607, 786, 484, 318, 380, 585, 641, 690, 333, 378, 543, 705, 612, 283, 397, 741, 451, 493, 463, 478, 544, 461, 731
	]);

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
					if (srcMatch) {
						catNum = parseInt(srcMatch[1], 10);
					} else if (unit.src.endsWith("_m00.png")) {
						catNum = eggs[unit.alt];
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
