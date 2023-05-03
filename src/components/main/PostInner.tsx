import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/Card";
dayjs.extend(relativeTime);
const PostInner = ({ username, text, createdAt }: { username: string; text: string; createdAt: Date }) => {
  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle>{username}</CardTitle>
        <div className="flex justify-between">
          <CardDescription>{text}</CardDescription>
          <CardDescription>{dayjs(createdAt).fromNow()}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PostInner;
