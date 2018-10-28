class Character {

    constructor(start, end) {
        this.pos = start;
        this.goal = end;
        this.vel = new paper.Point({angle: 270, length: 0});
        this.maxVel = 1;
        this.rad = 10;
        this.sensors = [];
        this.sensorDist = 50;
        this.sensorAngles = [-40, 0, 40];
        this.path = this.draw();
        this.path.applyMatrix = false;
        this.path.pivot = this.pos;
        this.collisions = [];
    }

    collide(path) {
        this.collisions.forEach(function (collision) {collision.remove();});
        this.collisions = [];
        for (var i = 1; i < this.path.children.length; i++) {
            console.log(this.path.children[i].segments);
            var intersects = this.path.children[i].getIntersections(path);
            for (var j = 0; j < intersects.length; j++) {
                this.collisions.push(new paper.Path.Circle({
                    center: intersects[j].point,
                    radius: 5,
                    fillColor: '#009dec'
                }));
            }
        }
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
        this.path.rotation = this.vel.angle;
    }

    draw() {
        for (var i = 0; i < this.sensorAngles.length; i++) {
            var sensor = new paper.Path.Line({
                from: this.pos,
                to: this.pos.add(new paper.Point({angle: this.sensorAngles[i], length: this.sensorDist})),
                strokeColor: 'red'
            });
            sensor.pivot = this.pos;
            this.sensors.push(sensor);
        }
        var circle = paper.Path.Circle({
            center: this.pos,
            radius: this.rad,
            strokeColor: 'blue',
            fillColor: 'powderblue'
        });
        return new paper.Group([circle].concat(this.sensors));
    }
}
