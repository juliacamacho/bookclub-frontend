import { Filter, ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError } from "./errors";

export interface RatingDoc extends BaseDoc {
  owner: ObjectId;
  book: ObjectId;
  value: number;
}

export default class RatingConcept {
  public readonly ratings = new DocCollection<RatingDoc>("ratings");

  async getRatings(query: Filter<RatingDoc>) {
    const ratings = await this.ratings.readMany(query);
    return ratings;
  }

  async addRating(user: ObjectId, bookId: ObjectId, value: number) {
    // first check if rating already exists for this book and user:
    const rating = await this.ratings.readOne({ owner: user, book: bookId });
    if (rating !== null) {
      await this.ratings.deleteOne({ owner: user, book: bookId });
      const _id = await this.ratings.createOne({ owner: user, book: bookId, value });
      return { msg: "Rating successfully updated!", folder: await this.ratings.readOne({ _id }) };
    }
    if (value < 0 || value > 5) {
      throw new NotAllowedError(`Rating for this book must be in between 0 and 5!`);
    }
    const _id = await this.ratings.createOne({ owner: user, book: bookId, value });
    return { msg: "Rating successfully created!", folder: await this.ratings.readOne({ _id }) };
  }

  async deleteRating(user: ObjectId, bookId: ObjectId) {
    await this.ratings.deleteOne({ owner: user, book: bookId });
    return { msg: "Rating deleted successfully!" };
  }
}
