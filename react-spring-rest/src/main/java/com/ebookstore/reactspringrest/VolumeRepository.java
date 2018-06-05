package com.ebookstore.reactspringrest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

//@RepositoryRestResource(collectionResourceRel = "books", path = "books")
@Repository
public interface VolumeRepository extends JpaRepository<Volume, Long>, JpaSpecificationExecutor<Volume> {
    public List<Volume>findByTitle(String title);
    public Volume findOneById(Long id);
    public void deleteById(Long id);
    //public List<Volume>findByCategory(String category);
    public List<Volume>findByLanguage(String language);
    //public List<Volume> findAllOrderByRatingCount();
    //public List<Volume> findAllOrderBySalesCount();
    //public List<Volume> findAllOrderByPriceAtAsc();
}
