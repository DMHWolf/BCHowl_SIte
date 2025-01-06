/************************************************************
 * 1) Helper: Roll a random integer in [1, 100] or [1, 20]
 ************************************************************/
function rollD100() {
    return Math.floor(Math.random() * 100) + 1;
}
function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}

/************************************************************
 * 2) Data Structures for Each Table
 ************************************************************/

/** Weather Effects (1.1) */
const weatherEffectsTable = [
    { range: [1, 10], result: "Much milder than average for location" },
    { range: [11, 30], result: "Milder than average for location" },
    { range: [31, 70], result: "Average for location" },
    { range: [71, 90], result: "Stronger than average for location" },
    { range: [91, 100], result: "Much stronger than average for location" },
];

/** Temperature (1.2) */
const temperatureTable = [
    { range: [1, 5], result: "Indoor: Much lower than expected" },
    { range: [6, 15], result: "Indoor: Lower than expected" },
    { range: [16, 85], result: "Indoor: Average / as expected" },
    { range: [86, 95], result: "Indoor: Higher than expected" },
    { range: [96, 100], result: "Indoor: Much higher than expected" },
];

/** Outdoor Sound (1.3) */
const outdoorSoundVolumeTable = [
    { range: [1, 5], volume: "Much quieter than expected" },
    { range: [6, 15], volume: "Quieter than expected" },
    { range: [16, 85], volume: "Average / as expected" },
    { range: [86, 95], volume: "Louder than expected" },
    { range: [96, 100], volume: "Much louder than expected" },
];
const outdoorSoundSourceChance = 95;

/** Indoor Sound (1.4) */
const indoorSoundVolumeTable = [
    { range: [1, 10], volume: "Much quieter than expected" },
    { range: [11, 30], volume: "Quieter than expected" },
    { range: [31, 70], volume: "Average / as expected" },
    { range: [71, 90], volume: "Louder than expected" },
    { range: [91, 100], volume: "Much louder than expected" },
];

/** Lighting (1.5) */
const lightingBrightnessTable = [
    { range: [1, 5], brightness: "Very dark" },
    { range: [6, 15], brightness: "Dark" },
    { range: [16, 85], brightness: "Visible (normal day/night lighting)" },
    { range: [86, 95], brightness: "Bright" },
    { range: [96, 100], brightness: "Very bright" },
];

/** Verticality of Form/Structure (1.6) */
const verticalityTable = [
    { range: [1, 20], result: "Positive (higher) only" },
    { range: [21, 40], result: "Mostly positive (higher)" },
    { range: [41, 60], result: "None" },
    { range: [61, 80], result: "Mostly negative (lower)" },
    { range: [81, 100], result: "Negative (lower) only" },
];

/** Purpose of a Structure (1.7) */
const structurePurposeRural = [
    { range: [1, 35], result: "Agricultural" },
    { range: [36, 45], result: "Commercial" },
    { range: [46, 55], result: "Industrial" },
    { range: [56, 65], result: "Infrastructural" },
    { range: [66, 70], result: "Institutional" },
    { range: [71, 100], result: "Residential" },
];
const structurePurposeUrban = [
    { range: [1, 2], result: "Agricultural" },
    { range: [3, 22], result: "Commercial" },
    { range: [23, 42], result: "Industrial" },
    { range: [43, 50], result: "Infrastructural" },
    { range: [51, 60], result: "Institutional" },
    { range: [61, 100], result: "Residential" },
];

/** Significant aspect (Indoor) (1.8) */
const significantAspectIndoorDay = [
    { range: [1, 80], result: "None" },
    { range: [81, 82], result: "Absence of someone/something" },
    { range: [83, 84], result: "Ambience" },
    { range: [85, 86], result: "Lighting" },
    { range: [87, 88], result: "Presence of someone/something" },
    { range: [89, 90], result: "Shape/structure" },
    { range: [91, 92], result: "Signs of unusual activity" },
    { range: [93, 94], result: "Size" },
    { range: [95, 96], result: "Smell" },
    { range: [97, 98], result: "Sound" },
    { range: [99, 100], result: "Temperature" },
];

/** Significant aspect (Outdoor) (1.9) */
const significantAspectOutdoorDay = [
    { range: [1, 66], result: "None" },
    { range: [67, 70], result: "Absence of someone/something" },
    { range: [71, 74], result: "Ambience" },
    { range: [75, 78], result: "Fauna" },
    { range: [79, 80], result: "Flora" },
    { range: [81, 82], result: "Formation" },
    { range: [83, 86], result: "Presence of someone/something" },
    { range: [87, 90], result: "Signs of unusual activity" },
    { range: [91, 94], result: "Smell" },
    { range: [95, 98], result: "Sound" },
    { range: [99, 100], result: "Structure" },
];

/** Sphere of Awareness (2.1) */
const sphereOfAwarenessTable = [
    { range: [1, 2], label: "Extremely small", diamMin: 1, diamMax: 20 },
    { range: [3, 4], label: "Very small", diamMin: 21, diamMax: 40 },
    { range: [5, 6], label: "Small", diamMin: 41, diamMax: 60 },
    { range: [7, 8], label: "Slightly small", diamMin: 61, diamMax: 80 },
    { range: [9, 10], label: "Medium", diamMin: 81, diamMax: 100 },
    { range: [11, 12], label: "Slightly large", diamMin: 101, diamMax: 120 },
    { range: [13, 14], label: "Large", diamMin: 121, diamMax: 140 },
    { range: [15, 16], label: "Very large", diamMin: 141, diamMax: 160 },
    { range: [17, 18], label: "Extremely large", diamMin: 161, diamMax: 180 },
    { range: [19, 20], label: "Unlimited", diamMin: 181, diamMax: 999999 },
];

/************************************************************
 * 3) Utility function to get table result by range
 ************************************************************/
function getResultFromTable(d100, table, valueKey = "result") {
    for (const row of table) {
        const [min, max] = row.range;
        if (d100 >= min && d100 <= max) {
            return row[valueKey] || row.result;
        }
    }
    return "No result found (check table definition).";
}

/************************************************************
 * 4) Generators for each table
 ************************************************************/
function generateWeather() {
    const roll = rollD100();
    const result = getResultFromTable(roll, weatherEffectsTable);
    return `Weather Roll (${roll}): ${result}`;
}

function generateTemperature() {
    const roll = rollD100();
    const result = getResultFromTable(roll, temperatureTable);
    return `Temperature Roll (${roll}): ${result}`;
}

function generateOutdoorSound() {
    // Volume
    const volRoll = rollD100();
    const volumeObj = outdoorSoundVolumeTable.find(
        row => volRoll >= row.range[0] && volRoll <= row.range[1]
    );
    const volumeResult = volumeObj ? volumeObj.volume : "Unknown volume";

    // Source type
    const srcRoll = rollD100();
    const sourceType = (srcRoll <= outdoorSoundSourceChance)
        ? "Environmental"
        : "Intelligent";

    // Multiple sources? (51-100 => Yes)
    const multiRoll = rollD100();
    const multipleSources = (multiRoll >= 51) ? "Yes" : "No";

    return `Outdoor Sound:
  - Volume Roll (${volRoll}): ${volumeResult}
  - Primary Source Roll (${srcRoll}): ${sourceType}
  - Multiple Sources Roll (${multiRoll}): ${multipleSources}`;
}

function generateIndoorSound() {
    const volRoll = rollD100();
    const volumeObj = indoorSoundVolumeTable.find(
        row => volRoll >= row.range[0] && volRoll <= row.range[1]
    );
    const volumeResult = volumeObj ? volumeObj.volume : "Unknown volume";

    const srcRoll = rollD100();
    const sourceType = (srcRoll <= 80)
        ? "Environmental"
        : "Intelligent";

    const multiRoll = rollD100();
    const multipleSources = (multiRoll >= 51) ? "Yes" : "No";

    return `Indoor Sound:
  - Volume Roll (${volRoll}): ${volumeResult}
  - Primary Source Roll (${srcRoll}): ${sourceType}
  - Multiple Sources Roll (${multiRoll}): ${multipleSources}`;
}

function generateLighting() {
    const roll = rollD100();
    const brightnessObj = lightingBrightnessTable.find(
        row => roll >= row.range[0] && roll <= row.range[1]
    );
    const brightness = brightnessObj ? brightnessObj.brightness : "Unknown";

    const multiRoll = rollD100();
    const multipleSources = (multiRoll >= 51) ? "Yes" : "No";

    const srcRoll = rollD100();
    const sourceType = (srcRoll <= 50) ? "Natural" : "Artificial";

    return `Lighting:
  - Brightness Roll (${roll}): ${brightness}
  - Primary Source Roll (${srcRoll}): ${sourceType}
  - Multiple Sources Roll (${multiRoll}): ${multipleSources}`;
}

function generateVerticality() {
    const roll = rollD100();
    const result = getResultFromTable(roll, verticalityTable);

    // Another roll for "One" or "Multiple" levels?
    const levelRoll = rollD100();
    const levels = (levelRoll <= 45) ? "One level" : "Multiple levels";

    return `Verticality Roll (${roll}): ${result}, ${levels}`;
}

function generateStructurePurpose(isRural = true) {
    const roll = rollD100();
    const table = isRural ? structurePurposeRural : structurePurposeUrban;
    const purpose = getResultFromTable(roll, table);
    return `Structure Purpose Roll (${roll}): ${purpose}`;
}

function generateSignificantAspectIndoor() {
    const roll = rollD100();
    const aspect = getResultFromTable(roll, significantAspectIndoorDay);
    return `Significant Indoor Aspect (${roll}): ${aspect}`;
}

function generateSignificantAspectOutdoor() {
    const roll = rollD100();
    const aspect = getResultFromTable(roll, significantAspectOutdoorDay);
    return `Significant Outdoor Aspect (${roll}): ${aspect}`;
}

function generateSphereOfAwareness() {
    const roll = rollD20();

    // Find which category the roll falls into
    const category = sphereOfAwarenessTable.find(entry => {
        const [low, high] = entry.range;
        return roll >= low && roll <= high;
    });

    if (!category) {
        return `Sphere of Awareness (roll ${roll}): No matching category.`;
    }

    // Random diameter within category's range
    let diameter;
    if (category.label.toLowerCase() === "unlimited") {
        diameter = 200; // or "200+"
    } else {
        diameter = Math.floor(
            Math.random() * (category.diamMax - category.diamMin + 1)
        ) + category.diamMin;
    }

    const radius = diameter / 2;
    const area = Math.PI * radius * radius;

    return `Sphere of Awareness (roll ${roll} => ${category.label}):
  - Diameter: ${diameter} ft
  - Radius:  ${radius} ft
  - Area:    ${area.toFixed(2)} square feet`;
}

/************************************************************
 * 5) Main "Generate" function
 ************************************************************/
function generateSurroundings() {
    let results = [];

    // Get references to checkboxes
    const weatherCbx = document.getElementById("weather");
    const temperatureCbx = document.getElementById("temperature");
    const outdoorSoundCbx = document.getElementById("outdoorSound");
    const indoorSoundCbx = document.getElementById("indoorSound");
    const lightingCbx = document.getElementById("lighting");
    const verticalityCbx = document.getElementById("verticality");
    const purposeCbx = document.getElementById("structurePurpose");
    const indoorAspCbx = document.getElementById("indoorAspect");
    const outdoorAspCbx = document.getElementById("outdoorAspect");
    const sphereAwarenessCbx = document.getElementById("sphereAwareness");

    // Collect results from all checked boxes
    if (weatherCbx && weatherCbx.checked) {
        results.push(generateWeather());
    }
    if (temperatureCbx && temperatureCbx.checked) {
        results.push(generateTemperature());
    }
    if (outdoorSoundCbx && outdoorSoundCbx.checked) {
        results.push(generateOutdoorSound());
    }
    if (indoorSoundCbx && indoorSoundCbx.checked) {
        results.push(generateIndoorSound());
    }
    if (lightingCbx && lightingCbx.checked) {
        results.push(generateLighting());
    }
    if (verticalityCbx && verticalityCbx.checked) {
        results.push(generateVerticality());
    }
    if (purposeCbx && purposeCbx.checked) {
        results.push(generateStructurePurpose(true));
    }
    if (indoorAspCbx && indoorAspCbx.checked) {
        results.push(generateSignificantAspectIndoor());
    }
    if (outdoorAspCbx && outdoorAspCbx.checked) {
        results.push(generateSignificantAspectOutdoor());
    }
    if (sphereAwarenessCbx && sphereAwarenessCbx.checked) {
        results.push(generateSphereOfAwareness());
    }

    // Show them in the results container
    const resultsContainer = document.getElementById("resultsContainer");
    if (!resultsContainer) {
        console.warn("No element with ID 'resultsContainer' found.");
        return;
    }

    if (results.length === 0) {
        resultsContainer.textContent = "No tables selected.";
        return;
    } else {
        // Display each result
        resultsContainer.innerHTML = results.map(r => `<p>${r}</p>`).join("");
    }

    // Create a multiline string for AI (optional)
    const combinedResults = results.join("\n");
    generateAIDescription(combinedResults);
}

/************************************************************
 * 6) Hook up the "Generate" button
 ************************************************************/
window.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    if (generateBtn) {
        generateBtn.addEventListener("click", generateSurroundings);
    }
});

/************************************************************
 * 7) AI Prompt + API Call - changed it up
 ************************************************************/
function buildAIPrompt(randomResults) {
    return `
You are a creative storytelling AI.
Please craft a short narrative medieval horror fantasy scene, describing the environment to single actor using the following random table results:

${randomResults}

In your story, tie together the setting details in a cohesive, atmospheric way.
Use a dark, ominous tone, and aim for around 2-3 concise paragraphs.
`;
}

async function generateAIDescription(randomResults) {
    // If you do NOT have a server endpoint, and you want to do it client-side 
    // (NOT recommended, as it exposes your API key), you must hard-code or get it 
    // from a config. Doing "require('fs')" won't work in the browser.

    // For demonstration, let's assume you have a variable MY_OPENAI_KEY 
    // or you fetch it from a secure endpoint:
    const MY_OPENAI_KEY = "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"; // not recommended client-side

    const prompt = buildAIPrompt(randomResults);

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${MY_OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    // Option A: Put your entire 'prompt' as the user content:
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const aiText = data?.choices?.[0]?.message?.content?.trim() || "No AI response";

        const aiContainer = document.getElementById("aiDescription");
        if (aiContainer) {
            aiContainer.textContent = aiText;
        } else {
            console.log("AI Description:", aiText);
        }
    } catch (err) {
        console.error("Error calling AI:", err);
        const aiContainer = document.getElementById("aiDescription");
        if (aiContainer) {
            aiContainer.textContent = "Error calling AI. Check console.";
        }
    }
}
