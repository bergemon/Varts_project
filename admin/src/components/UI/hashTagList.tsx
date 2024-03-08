import { List, ListItem } from "@material-tailwind/react";

type Props = {
  tags?: string[];
}

export const HashTagList = ({ tags }: Props) => (
  <>
    {tags && tags.length > 0 ?
      <List>
        {tags.map((tag, index) => (
          <ListItem key={index} className="bg-blue-gray-500 text-white rounded-full px-2 py-1 mr-2">
            {tag}
          </ListItem>
        ))}
      </List>
      : <span>Нет</span>
    }
  </>
);