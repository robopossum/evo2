class mapGenerator {

    constructor() {
        this.min = 5;
        this.max = 20;
        this.variance = 200;
        this.width = 50;
    }

    generate(start, end) {
        var path = this.randomPath(start, end);
        return this.generateCorridor(path);
    }

    randomPath(start, end) {
        var path = new paper.Path();
        path.add(start);
        var startPoint = new paper.Path.Circle(start, 5);
        var endPoint = new paper.Path.Circle(end, 5);
        startPoint.fillColor = '#cc0000';
        endPoint.fillColor = '#11bb00';
        var prev = start;
        var max = this.getRandomNodes();
        for (var i = 0; i < max - 1; i++) {
            var next = this.getNextNode(prev, end, max, i);
            path.add(next);
            prev = next;
        }
        path.add(end);
        return path;
    }

    generateCorridor(path) {
        var corridor = new paper.Path();
        var i = 0;
        corridor.add(new paper.Point(path.segments[i].point.x, path.segments[i].point.y + this.width));
        while ( i < path.segments.length) {
            corridor.add(new paper.Point(path.segments[i].point.x + this.width, path.segments[i].point.y));
            i++;
        }
        i--;
        corridor.add(new paper.Point(path.segments[i].point.x, path.segments[i].point.y - this.width));
        while ( i >= 0 ) {
            corridor.add(new paper.Point(path.segments[i].point.x - this.width, path.segments[i].point.y));
            i--;
        }
        corridor.closed=true;
        return corridor;
    }

    getRandomNodes() {
        return Math.floor(Math.floor(this.min) + (Math.random() * Math.floor(this.max)));
    }

    getNextNode(start, end, totalNodes, currentNode) {
        var nextX = this.getNextPos(start.x, end.x, totalNodes - currentNode);
        var nextY = this.getNextPos(start.y, end.y, totalNodes - currentNode);
        return new paper.Point(
            this.vary(nextX, totalNodes, currentNode),
            nextY
        );
    }

    getNextPos(min, max, stops) {
        return min + ((max - min) / stops);
    }

    vary(num, total, current) {
        return Math.floor(num + this.getVariance(total, current));
    }

    getVariance(total, current) {
        var goal = total / 2;
        var fudge = 2 / 10;
        current = current || total - 1;
        var factor = 1 - (1 / (goal / Math.abs(current - goal)));
        var varFactor = this.variance * factor;
        return (Math.random() - 0.5) * varFactor;
    }

}
