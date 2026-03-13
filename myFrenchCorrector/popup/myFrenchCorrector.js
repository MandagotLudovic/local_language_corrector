async function sendText() {
    const webhookUrl = document.querySelector("input[name='webhook_url']");
    const userText = document.querySelector("textarea[name='user_text']");
    const sectionNoCorrectionAvailable = document.querySelector("#NoCorrectedTextAvalaible");
    const sectionCorrectionAvailable = document.querySelector("#CorrectedTextAvalaible");
    const correctedText = document.querySelector("#correctedText");
    const btn = document.querySelector("#sendButton");

    console.log("Use => ", webhookUrl.value, " to correct => ", userText.value);
    const apiUrl = `${webhookUrl.value}?text=${userText.value}`
    try {
        btn.classList.toggle("loading")
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Status de la réponse : ${response.status}`);
        }

        const correctionJson = await response.json();
        correctedText.value = correctionJson.output;
        sectionNoCorrectionAvailable.classList.toggle("hidden");
        sectionCorrectionAvailable.classList.toggle("hidden");
        btn.classList.toggle("loading")
    } catch (e) {
        console.error(e);
        btn.classList.toggle("loading")
    }

}

async function fetchStorage() {
    const result = await browser.storage.local.get("webhookURL");

    if (result.webhookURL) {
        const webhookUrlInput = document.querySelector("input[name='webhook_url']");
        webhookUrlInput.value = result.webhookURL;
    }
}

async function updateStorage(key, value) {
    await browser.storage.local.set({ [key]: value });
}


document.addEventListener("DOMContentLoaded", async () => await fetchStorage());

document.querySelector("#sendButton").addEventListener("click", sendText);
document.querySelector("input[name='webhook_url']").addEventListener("click", () => {
    document.getElementById("inputWebhook").classList.toggle("shine");
});

document.querySelector("input[name='webhook_url']").addEventListener("blur", () => {
    document.getElementById("inputWebhook").classList.toggle("shine");
});

document.querySelector("#saveWebhookUrlBtn").addEventListener("click", async () => {
    const newWebhookUrl = document.querySelector("input[name='webhook_url']").value;
    await updateStorage("webhookURL", newWebhookUrl)
});
