
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Home",
      url: "/",
      children: [],
    },
    {
      id: 2,
      name: "About",
      url: "/about",
      children: [],
    },
    {
      id: 3,
      name: "Products",
      url: "/products",
      children: [
        {
          id: 4,
          name: "Product 1",
          url: "/products/1",
          children: [
            {
              id: 7,
              name: "Grandchild 1",
              url: "/products/1/grandchild1",
            },
            {
              id: 8,
              name: "Grandchild 2",
              url: "/products/1/grandchild2",
            },
          ],
        },
        {
          id: 5,
          name: "Product 2",
          url: "/products/2",
          children: [
            {
              id: 9,
              name: "Grandchild 1",
              url: "/products/2/grandchild1",
            },
            {
              id: 10,
              name: "Grandchild 2",
              url: "/products/2/grandchild2",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      name: "Contact",
      url: "/contact",
      children: [],
    },
  ])
  const [editingItem, setEditingItem] = useState(null)
  const handleAddMenuItem = (parentId = null) => {
    const newItem = {
      id: Date.now(),
      name: "New Menu Item",
      url: "#",
      children: [],
      parentId: parentId,
    }
    setMenuItems([...menuItems, newItem])
    setEditingItem(newItem)
  }
  const handleAddSubMenuItem = (parentItem) => {
    const newItem = {
      id: Date.now(),
      name: "New Sub Menu Item",
      url: "#",
      children: [],
      parentId: parentItem.id,
    }
    const updatedMenuItems = menuItems.map((item) =>
      item.id === parentItem.id ? { ...item, children: [...item.children, newItem] } : item,
    )
    setMenuItems(updatedMenuItems)
    setEditingItem(newItem)
  }
  const handleAddGrandchildMenuItem = (parentItem) => {
    const newItem = {
      id: Date.now(),
      name: "New Grandchild Menu Item",
      url: "#",
      children: [],
      parentId: parentItem.id,
    }
    const updatedMenuItems = menuItems.map((item) =>
      item.id === parentItem.id
        ? {
            ...item,
            children: item.children.map((child) =>
              child.id === parentItem.id ? { ...child, children: [...child.children, newItem] } : child,
            ),
          }
        : item,
    )
    setMenuItems(updatedMenuItems)
    setEditingItem(newItem)
  }
  const handleEditMenuItem = (item) => {
    setEditingItem(item)
  }
  const handleSaveMenuItem = (item) => {
    const updatedMenuItems = menuItems.map((i) => (i.id === item.id ? item : i))
    setMenuItems(updatedMenuItems)
    setEditingItem(null)
  }
  const handleDeleteMenuItem = (item) => {
    const updatedMenuItems = menuItems.filter((i) => i.id !== item.id)
    setMenuItems(updatedMenuItems)
  }
  const handleDragAndDrop = (dragIndex, hoverIndex) => {
    const updatedMenuItems = [...menuItems]
    const draggedItem = updatedMenuItems[dragIndex]
    updatedMenuItems.splice(dragIndex, 1)
    updatedMenuItems.splice(hoverIndex, 0, draggedItem)
    setMenuItems(updatedMenuItems)
  }
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-6">
        <h1 className="text-lg font-bold">Menu Editor</h1>
        <Button onClick={handleAddMenuItem}>Add Menu Item</Button>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-6">
          {menuItems.map((item, index) => (
            <div key={item.id} className="rounded-lg border bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div />
                  <div className="text-lg font-medium">{item.name}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditMenuItem(item)}>
                    <FilePenIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMenuItem(item)}>
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              {editingItem?.id === item.id && (
                <div className="mt-4">
                  <Input
                    label="Name"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                  <Input
                    label="URL"
                    value={editingItem.url}
                    onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditingItem(null)}>
                      Cancel
                    </Button>
                    <Button onClick={() => handleSaveMenuItem(editingItem)}>Save</Button>
                  </div>
                </div>
              )}
              {item.children.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm font-medium">Sub Menu Items</div>
                    <Button variant="ghost" size="icon" onClick={() => handleAddSubMenuItem(item)}>
                      <PlusIcon className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {item.children.map((child, childIndex) => (
                      <div key={child.id} className="rounded-lg border bg-background p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div />
                            <div className="text-sm font-medium">{child.name}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditMenuItem(child)}>
                              <FilePenIcon className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteMenuItem(child)}>
                              <TrashIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                        {child.children.length > 0 && (
                          <div className="mt-4 border-t pt-4">
                            <div className="mb-4 flex items-center justify-between">
                              <div className="text-xs font-medium">Grandchild Menu Items</div>
                              <Button variant="ghost" size="icon" onClick={() => handleAddGrandchildMenuItem(child)}>
                                <PlusIcon className="h-5 w-5" />
                              </Button>
                            </div>
                            <div className="grid gap-4">
                              {child.children.map((grandchild) => (
                                <div key={grandchild.id} className="rounded-lg border bg-background p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div />
                                      <div className="text-xs font-medium">{grandchild.name}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEditMenuItem(grandchild)}
                                      >
                                        <FilePenIcon className="h-5 w-5" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteMenuItem(grandchild)}
                                      >
                                        <TrashIcon className="h-5 w-5" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}