package com.ebookstore.reactspringrest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/api/volume")
public class VolumeRestController {

    @Autowired
    VolumeService volumeService;

    @GetMapping
    public List<Volume> getAllVolumes() {
        List<Volume> volumes = volumeService.findAll();
        return volumes;
    }


    //
    // curl "http://localhost:8080/api/volume/searchByKeyword?keyword=are"
    //
    @GetMapping("/searchByKeyword")
    public List<Volume> getSearchKeywordVolumes(@RequestParam(name="keyword", required = false) String keyword) {
        List<Volume> volumes = volumeService.findVolumesByKeyword(keyword);
        System.out.println("--searchByKeyword--");
        for(Volume volume:volumes)
            System.out.println(volume.getTitle());
        return volumes;
    }

    //
    // curl http://localhost:8080/api/volume/searchByProfile -i -XGET -H "Content-Type: application/json" -d "{\"category\": [ \"Business\"],\"language\":\"english\",\"orderBy\":\"Sales\", \"searchValue\":\"java\"}"
    //
    @GetMapping("/searchByProfile")
    public List<Volume> getSearchKeywordVolumes(@RequestBody Query query) {
        List<Volume> volumes = volumeService.findVolumesByProfile(query);

        System.out.println("--searchByProfile--");
        for(Volume volume:volumes)
            System.out.println(volume.getTitle());
        return volumes;
    }

    //
    //curl http://localhost:8080/api/volume/searchByCategories -i -XPOST -H "Content-Type: application/json" -d "{\"category\": [ \"Business & Economics\",\"Computers\"]}"
    //
    @PostMapping("/searchByCategories")
    public List<Volume> getThoseCategories(@RequestBody Query query) {
        System.out.println("--Got categories with "+query.getCategory()+" --");
        List<Volume> volumes = volumeService.findVolumesByCategories(query);

        System.out.println("--searchByCategories--");
        for(Volume volume:volumes)
            System.out.println(volume.getTitle());
        return volumes;
    }

    @GetMapping(path = "/{title}")
    public List<Volume> getVolumeByTitle(@PathVariable String title) {
        return volumeService.findByTitle(title);
    }

    @GetMapping(path = "/ofId/{id}")
    public Volume getVolumeById(@PathVariable Long id) {
        return volumeService.findOneById(id);
    }

    @PostMapping("/addVolume")
    @ResponseStatus(HttpStatus.CREATED)
    Volume postVolume(@RequestBody Volume volume) {
        return volumeService.create(volume);
    }


}

//curl http://localhost:8080/api/volume/searchByProfile -i -XGET -H "Content-Type: application/json" -d "{\"category\":\"fiction\",\"language\":\"english\",\"sortBy\":\"Sales\"}"
