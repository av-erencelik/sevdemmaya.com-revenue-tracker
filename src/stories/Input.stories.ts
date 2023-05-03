import { InputGroup } from "@/components/forms/InputGroup";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputGroup> = {
  title: "Example/Input",
  component: InputGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const NoError: Story = {
  args: {
    placeholder: "Type here...",
    type: "text",
    errorMessage: "",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Type here...",
    type: "text",
    errorMessage: "This is an error message",
  },
};
