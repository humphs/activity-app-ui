class Activity {
    constructor(name, unit, goal, color, glyphType) {
      this.name = name;
      this.unit = unit;
      this.goal = goal;
      this.color = color;
      this.glyphType = glyphType;
      this.arcPosition = 0;
      this.value = 0;
    }
  
    getName() {
      return this.name;
    }
  
    getColor() {
      this.color.setAlpha(255);
  
      return this.color;
    }
  
    setValue(value) {
      this.value = value;
    }
  
    setArcPosition(position) {
      this.arcPosition = position;
    }
  
    drawRing(x, y, w, stroke_weight) {
      noFill();
  
      strokeWeight(stroke_weight);
  
      this.color.setAlpha(30);
      stroke(this.color);
  
      // The background ring
      ellipse(x, y, w);
  
      this.color.setAlpha(255);
      stroke(this.color);
  
      // The arc or a single point if the arc is 0
      if (this.arcPosition == 0) {
        point(x, y - w / 2)
      } else {
        arc(x, y, w, w, 270, this.arcPosition + 270);
      }
    }
  
    drawGlyph(x, y, w, color) {
      push();
  
      translate(x, y);
  
      // If bit 1 is 1 then rotate 90 degrees
      if (this.glyphType & 2) {
        rotate(90, createVector(0, 0))
      }
  
      let weight = 0.12 * w;
      let offset = w * 0.25
  
      strokeWeight(weight)
      stroke(color || this.color);
  
      // If bit 0 is 1 then draw a second arrowhead and a shorter line
      if (this.glyphType & 1) {
        line(0, 0 - w / 2 + weight / 2 + offset, 0, w / 2 - weight / 2);
  
        line(0, 0 - w / 2 + weight / 2 + offset, 0 - w / 2 + weight / 2, offset)
        line(0, 0 - w / 2 + weight / 2 + offset, w / 2 - weight / 2, offset)
      } else {
        line(0, 0 - w / 2 + weight / 2, 0, w / 2 - weight / 2);
      }
  
      // The single arrow head
      line(0, 0 - w / 2 + weight / 2, 0 - w / 2 + weight / 2, 0)
      line(0, 0 - w / 2 + weight / 2, w / 2 - weight / 2, 0)
  
      pop();
    }
  
    animate() {
      let target = 360 / this.goal * this.value;
  
      // The lerp function never reaches the target value
      // Snap to the target value if the current arc position is close enough
      if ((target > this.arcPosition && this.arcPosition + 0.1 > target) || (target < this.arcPosition && this.arcPosition - 0.1 < target)) {
        this.arcPosition = target;
      }
  
      if (target != this.arcPosition) {
        this.arcPosition = lerp(this.arcPosition, target, 0.04);
      }
    }
  }