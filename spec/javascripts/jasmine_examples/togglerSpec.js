// describe("Trip detail toggler", function() {

//   describe("clicking a show link", function() {
//   	beforeEach(function() {
//       loadFixtures("one_index_trip.html");              // Given
//       var toggler = new Toggler();
//       toggler.init();
//   	  $(".detail_toggle").click();                      // When
//   	});

//   	it("shows the trip description", function() {
//   	  expect($('.detail')).not.toHaveClass(".hidden");  // Then
//   	});

//     it("changes the link action to 'Hide'", function() {
//       expect($(".detail_toggle")).toHaveText("Hide Details");
//     });

//     describe("clicking the link again", function() {
//       beforeEach(function() {
//         $(".detail_toggle").click();
//       });

//       it("hides the description", function() {
//         expect($(".detail")).toHaveClass("hidden");
//       });

//       it("changes the link action to 'Show Details'", function() {
//         expect($('.detail_toggle')).toHaveText("Show Details");
//       });
//     });
//   });
// });