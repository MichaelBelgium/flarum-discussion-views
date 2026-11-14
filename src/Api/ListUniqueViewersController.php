<?php

namespace Michaelbelgium\Discussionviews\Api;

use Flarum\Discussion\DiscussionRepository;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Michaelbelgium\Discussionviews\UniqueViewers;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * One page of distinct logged-in viewers, most recent first, for the footer viewlist modal.
 */
readonly class ListUniqueViewersController implements RequestHandlerInterface
{
    public function __construct(
        private UniqueViewers $uniqueViewers,
        private DiscussionRepository $discussions
    ) {}

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);

        // 404 for discussions the actor can't see.
        $discussion = $this->discussions->findOrFail(Arr::get($request->getAttribute('routeParameters'), 'id'), $actor);

        $actor->assertCan('readViewlist', $discussion);

        $page = $this->uniqueViewers->page(
            $discussion,
            $actor,
            RequestUtil::extractOffset($request),
            RequestUtil::extractLimit($request, UniqueViewers::DEFAULT_PAGE_SIZE, UniqueViewers::MAX_PAGE_SIZE)
        );

        return new JsonResponse([
            'data' => $page['viewers'],
            'meta' => ['total' => $page['total'], 'nextOffset' => $page['nextOffset']],
        ]);
    }
}
