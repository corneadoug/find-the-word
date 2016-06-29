(function() {
  'use strict';

  describe('Service: PointsService', function() {
    var pointsSvc;

    beforeEach(module('findTheWord'));

    beforeEach(inject(function(_pointsService_){
      pointsSvc = _pointsService_;
    }));

    it('should have total points set to 0', function() {
      expect(pointsSvc.total).toEqual(0);
    });

    it('should add points', function() {
      pointsSvc.addGamePoints(2);
      expect(pointsSvc.total).toEqual(2);
    });

    it('shouldn\'t add negative points', function() {
      pointsSvc.addGamePoints(-2);
      expect(pointsSvc.total).toEqual(0);
    });

    it('should make a 5 letter word worth 3 points', function() {
      expect(pointsSvc.calculateWordMaxScore(5)).toEqual(3);
    });

    it('should make a negative size word worth 0 points', function() {
      expect(pointsSvc.calculateWordMaxScore(-12)).toEqual(0);
    });

  });
})();
