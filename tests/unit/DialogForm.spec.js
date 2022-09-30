import Vuetify from "vuetify";
import DialogForm from "@/components/DialogForm.vue";

// Utilities
import { createLocalVue, mount } from "@vue/test-utils";

describe("DialogForm.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should have a custom title and match snapshot", () => {
    const wrapper = mount(DialogForm, {
      localVue,
      vuetify
    });

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot();

    // We could also verify this differently
    // by checking the text content
    const title = wrapper.find("span.text-h5");

    expect(title.text()).toBe("Symbol search");
  });
});
