import Element2 from "./Element";

class Page extends Element2 {
  async open(path) {
    await this.driver.get(path);
  }
}
export default Page;
//driver.find_elements_by_xpath("//*[contains(text(), 'My Button')]")
//   foo(){
//   fetch("google.com")
//   .then(response => JSON.parse(response))
//   .then(result=> console.log(result));
// }

// async foo2(url){
//     let response = await fetch(url);
//     let obj = await JSON.parse(response);
//     this.x += JSON.stringify(obj);
//   }
// }

// var z = new Page();
// z.x = "";

// z.foo2("google.com");
// z.foo2("yahoo.com");
