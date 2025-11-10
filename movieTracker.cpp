//The ADT implementation
#include "movieTracker.h"
#include <sstream>
#include <iomanip>

using namespace std;

Movie::Movie(const std::string& title,
            const std::string& genre,
            int year,
            const std::string& director,
            const std::string& synopsis,
            const std::vector<std::string>& actors)


    : title(title), genre(genre), year(year), director(director), synopsis(synopsis), actors(actors)
    {}


    //Accessors
    std::string Movie::getTitle() const {return title;}
    std::string Movie::getGenre() const {return genre;}
    int Movie:: getYear() const {return year;}
    std::string Movie::getDirector() const {return director;}
    std::string Movie::getSynopsis() const {return synopsis;}
    std::vector<std::string> Movie::getActors() const {return actors;}

    std::string Movie::getRatingString() const
    {
        return "N/A (To Watch)";
    }

    std::ostream& operator<<(std::ostream& os, const Movie& m)
    {
        os << "Title:    " << m.title << "\n"
            << "Director: " << m.director << "\n"
            << "Genre:    " << m.genre << " (" << m.year << ")\n"
            << "Rating:   " << m.getRatingString() << "\n"
            << "Starring: " << (m.actors.empty() ? "N/A" : m.actors[0])
            << (m.actors.size() > 1 ? " & others" : "") << "\n"
            << "Synopsis: " << m.synopsis.substr(0, 50) << "...\n";

        return os;
    }

    watchedMovie::watchedMovie( const std::string& title,
                                const std::string& genre,
                                int year,
                                const std::string& director,
                                const std::string& synopsis,
                                const std::vector<std::string>& actors,
                                float rating)
                
                :Movie(title, genre, year, director, synopsis, actors), rating (rating)
                {

                }

    float watchedMovie::getRating() const
    {
        return rating;
    }

    std::string watchedMovie::getRatingString() const
    {
        std::stringstream sStream;
        sStream<< std::fixed<< std::setprecision(1)<< "/5.0";
        return sStream.str();
    }