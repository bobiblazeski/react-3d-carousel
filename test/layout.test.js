var chai = require('chai');
var expect = chai.expect;
var Layout = require('../src/layout');

describe('Layout', function () {
    describe('Prism', function () {
        describe('#distance', function () {
            it('should return carousel distance', function () {
                expect(Layout.prism.distance(200, 3)).to.equal(58);
                expect(Layout.prism.distance(200, 7)).to.equal(208);
                expect(Layout.prism.distance(200, 12)).to.equal(374);
            });
        });

        describe('#figures', function () {
            it('should return carousel figures', function () {
                var images = ['1.jpg', '2.jpg', '3.jpg'];
                var figures = Layout.prism.figures(200, images, 0);
                //expect(JSON.stringify(figures)).to.deep.equal(1);
                expect(figures[0].image).to.equal(images[0]);
                expect(figures[1].image).to.equal(images[1]);
                expect(figures[2].image).to.equal(images[2]);

                var translateX = 58;
                expect(figures[0].translateZ).to.equal(translateX);
                expect(figures[1].translateZ).to.equal(translateX);
                expect(figures[2].translateZ).to.equal(translateX);
                var angle = 2 * Math.PI / 3;
                expect(figures[0].rotateY).to.equal(0 * angle);
                expect(figures[1].rotateY).to.equal(1 * angle);
                expect(figures[2].rotateY).to.equal(2 * angle);

            });

            it('should include starting angle', function () {
                var images = ['1.jpg', '2.jpg', '3.jpg'];
                var angle = 2 * Math.PI / 3;

                var figures = Layout.prism.figures(200, images, -angle);
                //expect(JSON.stringify(figures)).to.deep.equal(1);
                expect(figures[0].image).to.equal(images[0]);
                expect(figures[1].image).to.equal(images[1]);
                expect(figures[2].image).to.equal(images[2]);

                var translateX = 58;
                expect(figures[0].translateZ).to.equal(translateX);
                expect(figures[1].translateZ).to.equal(translateX);
                expect(figures[2].translateZ).to.equal(translateX);

                expect(figures[0].rotateY).to.equal(-1 * angle);
                expect(figures[1].rotateY).to.equal(0 * angle);
                expect(figures[2].rotateY).to.equal(1 * angle);
            });

            it('should round to acceptable angle (positive start)', function () {
                var images = ['1.jpg', '2.jpg', '3.jpg'];
                var angle = 2 * Math.PI / 3;
                var startAngle = 2 * Math.PI / 8 * 3;

                var figures = Layout.prism.figures(200, images, startAngle);
                //expect(JSON.stringify(figures)).to.deep.equal(1);
                expect(figures[0].image).to.equal(images[0]);
                expect(figures[1].image).to.equal(images[1]);
                expect(figures[2].image).to.equal(images[2]);

                var translateX = 58;
                expect(figures[0].translateZ).to.equal(translateX);
                expect(figures[1].translateZ).to.equal(translateX);
                expect(figures[2].translateZ).to.equal(translateX);

                expect(figures[0].rotateY).to.equal(1 * angle);
                expect(figures[1].rotateY).to.equal(2 * angle);
                expect(figures[2].rotateY).to.equal(3 * angle);
            });

            it('should round to acceptable angle (negative start)', function () {
                var images = ['1.jpg', '2.jpg', '3.jpg'];
                var angle = 2 * Math.PI / 3;
                var startAngle = 2 * Math.PI / 8 * 3;

                var figures = Layout.prism.figures(200, images, -startAngle);
                //expect(JSON.stringify(figures)).to.deep.equal(1);
                expect(figures[0].image).to.equal(images[0]);
                expect(figures[1].image).to.equal(images[1]);
                expect(figures[2].image).to.equal(images[2]);

                var translateX = 58;
                expect(figures[0].translateZ).to.equal(translateX);
                expect(figures[1].translateZ).to.equal(translateX);
                expect(figures[2].translateZ).to.equal(translateX);

                expect(figures[0].rotateY).to.equal(-1 * angle);
                expect(figures[1].rotateY).to.equal(0 * angle);
                expect(figures[2].rotateY).to.equal(1 * angle);
            });
        });
    });

    describe('Classic', function () {
        describe('#distance', function () {
            it('should return carousel distance', function () {
                expect(Layout.classic.distance(200, 3)).to.equal(220);
                expect(Layout.classic.distance(200, 7)).to.equal(389);
                expect(Layout.classic.distance(200, 12)).to.equal(497);
            });
        });

        describe('#figures', function () {
            it('should return classic carousel figures', function () {
                var images = ['1.jpg', '2.jpg', '3.jpg'];
                var figures = Layout.classic.figures(200, images, 0);
                //expect(JSON.stringify(figures,null,2)).to.deep.equal(1);
                expect(figures[0].image).to.equal(images[0]);
                expect(figures[1].image).to.equal(images[1]);
                expect(figures[2].image).to.equal(images[2]);

                
                expect(figures[0].translateZ).to.equal(220);
                expect(figures[1].translateZ).to.be.closeTo(-110,1);
                expect(figures[2].translateZ).to.be.closeTo(-110,1);
                
                expect(figures[0].rotateY).to.equal(0);
                expect(figures[1].rotateY).to.equal(0);
                expect(figures[2].rotateY).to.equal(0);
                
                expect(figures[0].translateX).to.be.closeTo(   0,1);
                expect(figures[1].translateX).to.be.closeTo( 190,1);
                expect(figures[2].translateX).to.be.closeTo(-190,1);
            });
        });
    });
});