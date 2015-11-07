namespace angularBeer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fieldchange : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Beers", "HasTried", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Beers", "HasTried", c => c.String());
        }
    }
}
