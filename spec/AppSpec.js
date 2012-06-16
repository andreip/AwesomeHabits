describe ("App", function(){
	var app;
	beforeEach (function(){
		//app = new App();
	});
	it("should have seven days", function(){
		expect(weekDays.length).toEqual(7)
	})

});

describe ("Track", function(){
	
	it("should get the progress with no data", function(){
		var trackModel = new TrackModel();
		expect(trackModel.get("progress")).toEqual("0.00");
	});

	it("should get the 14.29 with one day", function(){
		var trackModel = new TrackModel({name:"habit", data:[1]});
		expect(trackModel.get("progress")).toEqual("14.29");
	}); 

	it("should get the 42.86 with 3 days", function(){
		var trackModel = new TrackModel({name:"habit", data:[1,1,1]});
		expect(trackModel.get("progress")).toEqual("42.86");
	}); 

	it("should get the 100 with 7 days", function(){
		var trackModel = new TrackModel({name:"habit", data:[1,1,1,1,1,1,1]});
		expect(trackModel.get("progress")).toEqual("100.00");
	}); 

	it("should throw error for more than 7 days", function(){
		expect(function(){
			new TrackModel({name:"habit", data:[1,1,1,1,1,1,0,0,0,0]})
		}).toThrow(new Error("invalid data"));
	}); 

});