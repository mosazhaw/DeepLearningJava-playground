function getSentiment(event, text) {
    console.log(text);

    if (!text || event.key !== "Enter") {
        answer.innerHTML = '';
        return;
    }

    answerPart.style.visibility = "visible";

    // Get Sentiment
    fetch('/sentiment?' + new URLSearchParams({
        text: text,
    }), {
        method: 'GET',
        headers: {}
    }).then(
        response => {
            console.log(response)
            response.json().then(function (data) {
                let positivePercent = (data.find(item => item.className === "Positive").probability * 100).toFixed(2) + "%";
                let negativePercent = (data.find(item => item.className === "Negative").probability * 100).toFixed(2) + "%";
                positive.innerHTML = positivePercent;
                negative.innerHTML = negativePercent;
            });
        }
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );

}