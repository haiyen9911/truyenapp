export class Story {
    constructor(obj)
    {
        // Dau vao la mot mang 2 phan tu 
        if (Array.isArray(obj) && obj.length > 0)
        {
            this.id = obj[0]
            this.detail = obj[1].detail
            this.image = obj[1].image
            this.title = obj[1].title
            this.chapters = []
            return
        }

        this.id = ""
        this.detail = "Nothing"
        this.image = ""
        this.title = "Nothing"
        this.chapters = []
    }
}