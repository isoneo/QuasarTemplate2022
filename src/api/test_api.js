var test_data_one = [
  {
    col1: "testing_on1asdf",
    col2: "testing_on1asdf",
    col3: "testing_on1asdf",
    col4: "testing_on1asdf",
    col5: "testing_on1asdf",
    col6: "testing_on1asdf",
    col7: "testing_on1asdf",
    col8: "testing_on1asdf",
    col9: "testing_on1asdf",
    col10: "testing_on1asdf",
  },
];

export function test_api() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Test API");
      resolve({
        data: {
          results: test_data_one,
          count: test_data_one.length,
        },
      });
    }, 2500);
  });
}
