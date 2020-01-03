import Page from "./Page";

const visibilityId = "aboutUS";

class AboutUsPage extends Page {
  async isVisible() {
    return super.isVisibleById(visibilityId);
  }
}
export default AboutUsPage;
