import { List, ListItem } from "@material-tailwind/react";

type Props = {
  tags?: string[];
}

export const HashTagList = ({ tags }: Props) => {
  const tagg = ['123', '123', '123']
  return (
    <>
      {tagg && tagg.length > 0 ?
        <List>
          {tagg.map((tag, index) => (
            <ListItem key={index} className="bg-blue-gray-500 text-white rounded-full px-2 py-1 mr-2">
              {tag}
            </ListItem>
          ))}
        </List>
        : <span>Нет</span>
      }
    </>
  )
};