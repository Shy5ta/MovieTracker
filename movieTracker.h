//ADT Interface
#ifndef MOVIETRACKER_H
#define MOVIETRACKER_H

#include <string>
#include <iostream>
#include <vector>

class Movie
{
    public:
        Movie(const std::string& title, 
            const std::string& genre, 
            int year, 
            const std:: string& director, 
            const std:: string& synopsis, 
            const std:: vector<std::string>& actors);
         
            
        std:: string getTitle() const;
        std:: string getGenre() const;
        int getYear() const;
        std::string getDirector() const;
        std::string getSynopsis() const;
        std::vector<std::string> getActors() const; 

        virtual std::string getRatingString() const;

        friend std::ostream& operator<<(std::ostream& os, const Movie& m);

    private:
            std::string title;
            std::string genre;
            int year;
            std::string director;
            std:: string synopsis;
            std::vector<std::string> actors;

};

class watchedMovie: public Movie
{
    public:
        watchedMovie(const std::string& title,
                    const std::string& genre,
                    int year, 
                    const std::string& director,
                    const std::string& synopsis,
                    const std::vector<std::string>& actors, 
                    float rating);
        
        std::string getRatingString() const override;

        float getRating() const;

    private:
            float rating;
};
#endif