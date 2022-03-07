import React, { useState } from 'react';

import CategoryActions from './Dropdowns/CategoryActions';

const Tree: React.FC<{
  data: any;
  onDelete: (categoryId: string) => void;
}> = props => {
  return (
    <div>
      <ul className="flex flex-col">
        {props.data.map((tree: any) => (
          <TreeNode
            node={tree}
            categoryId={tree.id}
            key={tree.id}
            onDelete={() => props.onDelete(tree.id)}
          />
        ))}
      </ul>
    </div>
  );
};

const TreeNode: React.FC<{
  node: any;
  categoryId: string;
  onDelete: (categoryId: string) => void;
}> = ({ node, categoryId, onDelete }) => {
  const [childVisible, setChildVisible] = useState(false);

  const hasChild = node.subcategories.length === 0 ? false : true;

  return (
    <li
      key={node.name}
      className="w-full border-[1px] border-gray-300 px-10 text-lg animate-[slide-down_0.3s_ease]"
    >
      <div
        className="flex justify-between"
        onClick={e => {
          setChildVisible(v => !v);
        }}
      >
        <div className="flex">
          {hasChild && (
            <div className="p-3">
              {childVisible ? (
                <i className="fa-solid fa-minus"></i>
              ) : (
                <i className="fa-solid fa-plus"></i>
              )}
            </div>
          )}

          <div className="p-3">{node.name}</div>
        </div>
        <CategoryActions
          categoryId={categoryId}
          onDelete={() => onDelete(categoryId)}
        />
      </div>

      {hasChild && childVisible && (
        <div>
          <ul>
            <Tree data={node.subcategories} onDelete={() => onDelete(categoryId)} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Tree;
