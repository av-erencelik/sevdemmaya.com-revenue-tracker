import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    children: "Button",
    disabled: true,
  },
};

export const Loading: Story = {
  render: (args) => {
    return (
      <Button {...args}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
      </Button>
    );
  },
  args: {
    variant: "default",
    disabled: true,
  },
};
