var nonLinearSlider = document.getElementById("nonlinear");

noUiSlider.create(nonLinearSlider, {
    connect: true,
    behaviour: "tap",
    start: [1, 3000],
    range: {
        min: [1],
        "10%": [5000, 5000],
        "50%": [40000, 5000],
        max: [75000]
    }
});

var nodes = [
    document.getElementById("lower-value"),
    document.getElementById("upper-value")
];

nonLinearSlider.noUiSlider.on("update", function (e, t) {
    let formatted = Number(e[t]).toLocaleString('en-AE', {
        minimumFractionDigits: 0
    });
    nodes[t].innerHTML = formatted;
});
