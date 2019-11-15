import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import { Log } from "../entity/Log";
import { Category } from "../entity/resources/Category";
import { Tag } from "../entity/resources/Tag";
import { Post } from "../entity/resources/Post";
import config from "../config/config";
import { ErrorHandler } from "../utils/errors";
import { jsonResponse } from "../utils/response";
import { slugify } from "../utils/index";
const data = {
  users: [
    {
      username: "guibs-1",
      password: "admin",
      email: "gaby01@codi.tech",
      role: "ADMIN"
    },
    {
      username: "guibs-2",
      password: "admin",
      email: "gaby02@codi.tech",
      role: "ADMIN"
    },
    {
      username: "guibs-3",
      password: "admin",
      email: "gaby03@codi.tech",
      role: "ADMIN"
    },
    {
      username: "guibs-4",
      password: "admin",
      email: "gaby04@codi.tech",
      role: "ADMIN"
    }
  ],
  categories: [
    {
      name: "HTML",
      description: "Hello worlds this is something new",
      children: []
    },
    {
      name: "CSS",
      description: "Hello worlds this is something new",
      children: [
        {
          name: "GRID",
          description: "Hello worlds this is something new",
          children: []
        },
        {
          name: "FLEX",
          description: "Hello worlds this is something new",
          children: []
        },
        {
          name: "ANIMATION",
          description: "Hello worlds this is something new",
          children: []
        }
      ]
    },
    {
      name: "JAVASCRIPT",
      description: "Hello worlds this is something new",
      children: []
    }
  ],
  tags: [
    {
      name: "Getting started",
      description: "Getting started Getting started Getting started"
    }
  ],
  posts: [
    {
      title: "How to read",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 2",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 3",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 4",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 5",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 6",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 7",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 8",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 9",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 10",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 11",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 12",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 13",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 14",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 15",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 16",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 17",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 18",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 19",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    },
    {
      title: "How to read 20",
      description: "Getting started Getting started Getting started",
      url: "http://google.com/test",
      isAvailable: true
    }
  ]
};
const generateRandomString = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 4) +
    Math.random()
      .toString(36)
      .substring(2, 4)
  );
};
class FakeController {
  static createUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userRepository = getRepository(User);
    const randomString = generateRandomString();

    const users = data.users.map(
      async ({ username, email, password, role }, index) => {
        const user = new User();
        user.username = randomString + username;
        user.email = randomString + email;
        user.password = password;
        user.role = role;
        user.hashPassword();
        await userRepository.save(user);
        return user;
      }
    );
    await Promise.all(users);
    res.status(200).json({
      success: true,
      users
    });
  };

  static createCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userRepository = getRepository(User);
    const categoryRepository = getRepository(Category);

    const users = await userRepository.find();
    const randomString = generateRandomString();

    data.categories.map(async ({ name, description, children }, index) => {
      const category = new Category();
      category.name = randomString + name + "-" + (index + 1);
      category.slug = slugify(category.name);
      category.description = description;
      category.user = users[Math.floor(Math.random() * users.length)];
      await categoryRepository.save(category);
      children.map(async (child_category, childIndex) => {
        const _child_category = new Category();
        _child_category.parent = category;
        _child_category.name =
          randomString +
          child_category.name +
          "-" +
          (index + 1) +
          "--" +
          (childIndex + 1);
        _child_category.slug = slugify(_child_category.name);
        _child_category.description = child_category.description;
        _child_category.user = users[Math.floor(Math.random() * users.length)];
        await categoryRepository.save(_child_category);
      });
      res.status(200).json({
        success: true
      });
    });
  };
  static createTags = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userRepository = getRepository(User);
    const tagsRepository = getRepository(Tag);
    const randomString = generateRandomString();
    const users = await userRepository.find();

    const tags = data.tags.map(async ({ name, description }, index) => {
      const tag = new Tag();
      tag.name = randomString + name + "-" + (index + 1);
      tag.slug = slugify(tag.name);
      tag.description = description;
      tag.user = users[Math.floor(Math.random() * users.length)];
      await tagsRepository.save(tag);
      return tag;
    });
    await Promise.all(tags);

    res.status(200).json({
      success: true
    });
  };
  static createPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userRepository = getRepository(User);
    const postRepository = getRepository(Post);
    const tagRepository = getRepository(Tag);
    const categoryRepository = getRepository(Category);

    const users = await userRepository.find();
    const categories = await categoryRepository.find();
    const tags = await tagRepository.find();
    const randomString = generateRandomString();

    users.map(async (user, index) => {
      const posts = data.posts.map(
        async ({ title, description, isAvailable, url }, postIndex) => {
          const post = new Post();
          post.title = randomString + title + " - " + index + "s" + postIndex;
          post.slug = slugify(post.title);
          post.description = description;
          post.isAvailable = isAvailable;
          post.url = url;
          post.category =
            categories[Math.floor(Math.random() * categories.length)];
          post.user = user;
          post.tags = [
            tags[Math.floor(Math.random() * tags.length)],
            tags[Math.floor(Math.random() * tags.length)],
            tags[Math.floor(Math.random() * tags.length)]
          ];
          try {
            await postRepository.save(post);
          } catch (err) {}
        }
      );
      await Promise.all(posts);
    });

    await Promise.all(tags);

    res.status(200).json({
      success: true
    });
  };
}
export default FakeController;
