function setup() {
    createCanvas(400, 800);
    angleMode(DEGREES);

    moveActivity = new Activity('move', 'cal', 400, color(226, 2, 28), 2);
    excersizeActivity = new Activity('exercise', 'min', 30, color(60, 221, 1), 3);
    standActivity = new Activity('stand', 'hr', 12, color(0, 194, 222), 0);

    moveSlider = createSlider(0, 400, 0);
    moveSlider.parent("sliders");

    exerciseSlider = createSlider(0, 30, 0);
    exerciseSlider.parent("sliders");

    standSlider = createSlider(0, 12, 0);
    standSlider.parent("sliders");

    animateButton = createButton('Animate');
    animateButton.parent("buttons");
    animateButton.mousePressed(animateRings);

    resetButton = createButton('Reset');
    resetButton.parent("buttons");
    resetButton.mousePressed(resetRings);

    frameRate(60);
}

function animateRings() {
    moveActivity.setArcPosition(0);
    excersizeActivity.setArcPosition(0);
    standActivity.setArcPosition(0);
}

function resetRings() {
    moveSlider.value(0);
    exerciseSlider.value(0);
    standSlider.value(0);

}

function draw() {
    background(0);

    moveActivity.setValue(moveSlider.value());
    excersizeActivity.setValue(exerciseSlider.value());
    standActivity.setValue(standSlider.value());

    moveActivity.animate();
    excersizeActivity.animate();
    standActivity.animate();

    ringsX = width / 2;
    ringsY = width / 2;

    moveActivity.drawRing(ringsX, ringsY, 280, 30);
    excersizeActivity.drawRing(ringsX, ringsY, 210, 30);
    standActivity.drawRing(ringsX, ringsY, 140, 30);

    moveActivity.drawGlyph(ringsX, ringsY - 140, 20, '#000');
    excersizeActivity.drawGlyph(ringsX, ringsY - 105, 20, '#000');
    standActivity.drawGlyph(ringsX, ringsY - 70, 20, '#000');

    drawInfoPanel(moveActivity, 0);
    drawInfoPanel(excersizeActivity, 1);
    drawInfoPanel(standActivity, 2);
}

function drawInfoPanel(activity, index) {
    push();

    let padding = 20;

    translate(0, width + width / 3 * index);

    noFill();
    stroke('#fff');
    strokeWeight(1);

    //rect(0, 0, width, width / 3);

    translate(padding, 0);

    let paddedHeight = floor(width / 3) - padding
    let paddedWidth = width - padding * 2

    fill('#242424');
    noStroke();

    // Background panel
    rect(0, 0, paddedWidth, paddedHeight, width / 35)

    // Draw ring and glyph
    let ringWidth = 60;
    let ringXOffset = paddedHeight / 2;

    activity.drawGlyph(ringXOffset, paddedHeight / 2, 25);
    activity.drawRing(ringXOffset, ringXOffset, paddedHeight / 2, 10);

    // Draw text information
    let textSpacing = 4;

    let topBaseline = paddedHeight / 2 - textSpacing;
    let bottomBaseline = paddedHeight / 2 + textSpacing;

    noStroke();
    fill('#fff');

    // Write the activity name
    textSize(25);
    let activityText = activity.name.toUpperCase();

    text(activityText, paddedHeight, topBaseline);

    // Write the percentage completed  
    let percentageText = round(activity.value / activity.goal * 100);

    fill(activity.getColor());
    text(percentageText + '%', paddedHeight + textSpacing + textWidth(activityText), topBaseline);

    // Write the current value & goal
    let progressText = activity.value + '/' + activity.goal + ' ' + activity.unit.toUpperCase();
    let progressTextSize = 25;

    textAlign(LEFT, TOP);
    textSize(progressTextSize);
    text(progressText, paddedHeight, bottomBaseline)

    pop();
}