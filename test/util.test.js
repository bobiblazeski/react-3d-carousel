var chai = require('chai');
var expect = chai.expect;
var Util= require('../src/util');

describe('Util',function(){
    describe('#figureStyle',function(){
        it('should create figure style',function(){
            var d = {
                translateX: 10,
                rotateY: 50,
                translateZ: 40,
                opacity: 0.7
            };
            var style = Util.figureStyle(d);
            console.log(style);
            expect(style).to.not.be.a('null');
            expect(style).to.have.ownProperty('opacity');
            expect(style.opacity).to.equal(d.opacity);
            expect(style).to.have.ownProperty('transform');
            expect(style.transform).to.equal('rotateY(50rad)  translateX(10px) translateZ(40px)');
        });
    });

    describe('#partial',function(){
        it('should return partially apllied function',function(){
            var multiply = function(a, b) { return a * b; };
            var double = Util.partial(multiply, 2);
            expect(double(2)).to.equal(4);
            function greet(salutation, firstName, lastName) {
                return salutation + ', ' + firstName + ' ' + lastName + '!';
            }
            var sayHello = Util.partial(greet, 'Hello');
            expect(sayHello('Charlie','Brown')).to.equal('Hello, Charlie Brown!')
        });
    });

    describe('#range',function(){
       it('#should return range',function(){
           expect(Util.range(1, 5)).to.deep.equal([1, 2, 3, 4]);
           expect(Util.range(50, 53)).to.deep.equal([50, 51, 52]);
       });
    });

    describe('#uniq',function(){
        it('#should return uniq items',function(){
            expect(Util.uniq([1,2,1,3,4,3])).to.deep.equal([1, 2, 3, 4]);
            expect(Util.uniq(['a','a','b','b'])).to.deep.equal(['a','b']);
        });
    });
    
    describe('#merge',function(){
        it('#should return merged object',function(){
            expect(Util.merge({a:1},{b:2})).to.deep.equal({a:1,b:2});
            expect(Util.merge({a:1,b:3},{b:2})).to.deep.equal({a:1,b:2});
        });
    });
    
     describe('#pluck',function(){
        it('#should return plucked property',function(){
            expect(Util.pluck('b',[{b:2},{b:3}])).to.deep.equal([2,3]);
        });
    });
    
    describe('#mapObj',function(){
        it('#should return mapped object',function(){
            expect(Util.mapObj(function(x){return 2*x;},{a:2,b:4})).to.deep.equal({a:4,b:8});
        });
    });
});
