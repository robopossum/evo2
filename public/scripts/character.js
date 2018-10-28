class Character {

    constructor(start, end) {
        this.pos = start;
        this.goal = end;
        this.vel = new paper.Point({angle: 270, length: 0});
        this.maxVel = 1;
        this.rad = 10;
        this.sensors = [];
        this.sensorDist = 50;
        this.sensorCount = 3;
        this.path = this.draw();
    }

    collide(path) {

    }

    iterate(forward, back, tLeft, tRight) {
        this.handleControls(forward, back, tLeft, tRight);
        this.limitDeltas();
        this.updatePosition();
    }

    limitDeltas() {
        if (this.vel.length > this.maxVel) {
            this.vel.length = this.maxVel;
        } else if (this.vel.length < 0) {
            this.vel.length = 0;
        }
        this.vel.angle = this.vel.angle % 360;
    }

    handleControls(forward, back, tLeft, tRight) {
        var deltaV = 0;
        deltaV += forward ? 0.05 : 0;
        deltaV -= back ? 0.05 : 0;
        this.vel.length += deltaV;
        var deltaR = 0;
        deltaR += tRight ? 1 : 0;
        deltaR -= tLeft ? 1: 0;
        this.vel.angle += deltaR;
    }

    updatePosition() {
        this.path.translate(this.vel);
    }

    draw() {
        return paper.Path.Circle({
            center: this.pos,
            radius: this.rad,
            strokeColor: 'blue',
            fillColor: 'powderblue'
        });
    }
}
