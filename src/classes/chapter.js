export class Chapter {
    constructor(obj)
    {
        if(obj)
        {
            this.id = obj.id
            this.name = obj.name
            return;
        }

        this.id = "Nothing"
        this.name = "Nothing"
    }

}