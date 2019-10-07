// https://www.leighhalliday.com/mocking-axios-in-jest-testing-async-functions
import mockAxios from "axios";
import unsplash from "./UnsplashService";

describe('UnsplashService', () => {
  it("fetches data from unsplash", async () => {
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: { results: ["cat.jpg"] }
        })
    );
    const images = await unsplash("cats");
    expect(images).toEqual(["cat.jpg"]);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            client_id: process.env.REACT_APP_UNSPLASH_TOKEN,
            query: "cats"
          }
        }
    );
  });
} )
