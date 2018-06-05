package com.ebookstore.reactspringrest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VolumeService {
    @Autowired
    VolumeRepository volumeRepository;

    @Autowired
    VolumeSpecifications volumeSpecifications;

    public List<Volume> findVolumesByCategories(Query query) {

        List<String> categories=query.getCategory();
        List<Volume> volumes=volumeRepository.findAll(Specifications
                        .where(volumeSpecifications.containsCategories(categories))
            );
        return volumes;
    }


    public List<Volume> findVolumesByKeyword(String keyword) {
        return volumeRepository.findAll(Specifications
                .where(volumeSpecifications.titleContains(keyword))
                .or(volumeSpecifications.descriptionContains(keyword))
                .or(volumeSpecifications.authorContains(keyword))
        );
    }
    /*
 curl http://localhost:8080/api/volume/searchByProfile -i -XGET -H "Content-Type: application/json" -d "{\"category\": [ \"Business\"],\"language\":\"english\",\"orderBy\":\"Sales\", \"searchValue\":\"java\"}"

 curl http://localhost:8080/api/volume/searchByCategories -i -XGET -H "Content-Type: application/json" -d "{\"category\": [ \"Business & Economics\",\"Computers\"]}"


     */

    public List<Volume> findVolumesByProfile(Query query) {

        List<String> categories=query.getCategory();
        String language=query.getLanguage();
        String searchValue=query.getSearchValue();
        List<Volume> volumes=volumeRepository.findAll(Specifications
                .where(
                        volumeSpecifications.titleContains(searchValue))
                    .or(volumeSpecifications.descriptionContains(searchValue))
                    .or(volumeSpecifications.authorContains(searchValue))
                    .or(volumeSpecifications.containsCategories(categories))
                    //.or(volumeSpecifications.languageContains(language))

        );
        return volumes;
    }







    public List<Volume> findAll() {
        return volumeRepository.findAll();
    }

    public List<Volume> findByTitle(String title) {

        return volumeRepository.findByTitle(title);
    }

    public Volume findOneById(Long id) {
        return volumeRepository.findOneById(id);
    }


    public Volume create(Volume volume) {

        return volumeRepository.save(volume);
    }

    public void delete(Long id) {
        volumeRepository.deleteById(id);
    }

    public Volume update(Volume volume) {
        return volumeRepository.save(volume);
    }
}


